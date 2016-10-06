import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit }          from '@angular/core';

import * as Common                  from '../../common/index';
import * as Services                from '../services/index';
import {ModalBase}                  from './ModalBase';


@Component({
    templateUrl: 'src/views/post-publish.html',
})
export class PostPublishComponent extends ModalBase implements OnInit, AfterViewInit {
    Status: string;
    Finished: boolean = false;
    Success: boolean;
    Failed: boolean;
    mCanSubmit: boolean = false;

    constructor(private settingService: Services.SettingService,
        private postManageService: Services.PostManageService,
        private metaweblogService: Services.MetaweblogService,
        private electronService: Services.ElectronService,
        private postFileService: Services.PostFileService,
        private logService: Services.LogService) {
        super();
    }

    CanSubmit(): boolean {
        return this.mCanSubmit;
    }
    UseCancel(): boolean {
        return false;
    }
    ngOnInit(): any {
        this.StartPublish();
    }
    ngAfterViewInit(): void {

    }
    ngAfterContentInit(): void {

    }

    private StartPublish(): void {
        let file = this.postManageService.CurrentPost;
        let account = this.settingService.DefaultAccount;
        let xmlRpcRequest = new Common.XmlRpcRequest();
        let methods = new Common.MetaweblogMethods();

        let now = Date.now().toString();
        file.Post.DateCreated = now;
        file.Post.DateModified = now;
        file.PostTitle = file.Post.Title;
        if (!file.CreatedDate)
            file.CreatedDate = now;

        this.Title = "Publish";
        this.Status = "Publishing '" + file.Post.Title + "' to blog '" + account.NickName + "'.";

        this.logService.Log("Prepare to publish: ", file);

        try {
            this.logService.Log("Account ", account);
            let predicate = (postFile: Common.PostFile, blogName:string): boolean => {
                return postFile.History != null
                    && postFile.History.length > 0
                    && postFile.History.some(x => x.Blog == blogName);
            }

            let published = predicate( file, account.ApiUrl); //file.HasPublishedTo(account.ApiUrl);
            if (published) {
                this.logService.LogMessage("Publish post as edit.");
                this.PublishEdit(xmlRpcRequest, account, methods, file);
            }
            else {
                this.logService.LogMessage("Publish post as new.");
                this.PublishNew(xmlRpcRequest, account, methods, file);
            }
        }
        catch (error) {
            this.logService.Log(error);
        }

        try {
            this.logService.Log("Saving post file", file);
            this.postFileService.Save(file);
        }
        catch (error) {
            throw error;
        }
    }

    private PublishNew(xmlRpcRequest: Common.XmlRpcRequest,
        account: Services.BlogAccount,
        methods: Common.MetaweblogMethods,
        file: Common.PostFile): void {

        this.logService.Log("Publish new post ", file);
        xmlRpcRequest.NewPost(account.ApiUrl, methods.NewPost("blogid", account.UserName, account.Password, file.Post))
            .then(response => {
                console.log("Post published.")
                console.log(response);

                // save publish history
                var historyRecord = new Common.PostPublishHistory();
                historyRecord.Blog = account.ApiUrl;
                historyRecord.Date = Date.now().toString();
                historyRecord.PostId = response;
                file.RecordPublish(historyRecord);

                this.PublishSuccessed(account.HomeUrl);
            })
            .catch(reason => {
                this.PublishFailed(reason);
            });
    }

    private PublishEdit(xmlRpcRequest: Common.XmlRpcRequest,
        account: Services.BlogAccount,
        methods: Common.MetaweblogMethods,
        file: Common.PostFile): void {

        this.logService.Log("Publish edit post ", file);
        let record = file.History.find(x => x.Blog == account.ApiUrl);
        let postId = record.PostId;
        xmlRpcRequest.EditPost(account.ApiUrl, methods.EditPost(postId, account.UserName, account.Password, file.Post))
            .then(response => {
                
                this.PublishSuccessed(account.HomeUrl);
            })
            .catch(reason => {
                this.PublishFailed(reason);
            });
    }
    private PublishSuccessed(url: string): void {
        this.Status = "Publish success.";
        this.Finished = true;
        this.Success = true;
        this.mCanSubmit = true;

        this.electronService.OpenExternal(url);
    }
    private PublishFailed(reason: any): void {
        console.log("Publish post error: " + reason);
        this.Status = "Publish failed for " + reason;
        this.Finished = true;
        this.Failed = true;
        this.mCanSubmit = true;
    }
}