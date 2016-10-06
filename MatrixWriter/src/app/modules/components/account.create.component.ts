import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';

import * as Services                         from '../services/index';

@Component({
    templateUrl: 'src/views/account.create.html'
})
export class CreateAccountComponent implements OnInit {
    Title: string;
    Subtitle: string;
    CurrentStep: number = 1;
    TotalSteps: number = 4;
    DetectProgress: number = 0;
    DetectTotal: number = 10;
    ProcessState: string;
    Remember: boolean = true;
    Finished: boolean;
    SupportBlogs: Array<BlogService> = [new BlogService(1, "WordPress", true), new BlogService(2, "Google Blogger", false), new BlogService(3, "Other service", false)]
    SelectedBlogId: number = 1;
    Account: Services.BlogAccount = new Services.BlogAccount();

    constructor(private mRouter: Router, private mDetector: Services.MetaweblogDetector, private settingService: Services.SettingService) { }

    ngOnInit(): any {
        this.Title = "Add a blog account";
        this.Subtitle = "Matrix writer support most popular blog services.";
        this.Account.HomeUrl = "https://andylangyu.wordpress.com/";
        this.Account.UserName = "nnlyx@hotmail.com";
        this.Account.Password = "supernova";
        this.Account.NickName = "Nick name";
    }
    Next(): void {
        if (this.CurrentStep < this.TotalSteps)
            this.CurrentStep++;

        if (this.CurrentStep == 3)
            this.StartDetection();
    }
    CanGoNext(): boolean {
        if (this.CurrentStep == 2) {
            if (this.Account.HomeUrl && this.Account.UserName && this.Account.Password)
                return true;
            else
                return false;
        }
        else if (this.CurrentStep == 3) {
            return this.Finished;
        }
        return this.CurrentStep < this.TotalSteps;
    }
    Previous(): void {
        if (this.CurrentStep > 1)
            this.CurrentStep--;
    }
    CanGoPrevious(): boolean {
        return this.CurrentStep > 1;
    }
    Finish(): void {
        // save to settingService
        this.Account.IsDefault = true;
        let account = this.settingService.Setting.BlogAccounts.find(x => x.HomeUrl == this.Account.HomeUrl);
        if (!account) {
            this.settingService.Setting.BlogAccounts = this.settingService.Setting.BlogAccounts.filter(x => x.HomeUrl != this.Account.HomeUrl);
        }
        this.settingService.Setting.BlogAccounts.push(this.Account);
        this.settingService.SaveSettings();
        this.GoToWelcome();
    }
    CanFinish(): boolean {
        return this.CurrentStep == this.TotalSteps;
    }
    Cancel(): void {
        this.GoToWelcome();
    }
    GoToWelcome(): void {
        this.mRouter.navigate(['welcome']);
    }
    StartDetection(): void {
        this.ProcessState = "Processing " + this.Account.HomeUrl;
        this.DetectProgress = 2;
        this.mDetector.Detect(this.Account)
            .then(response => {
                console.log(response);
                this.DetectProgress = 10;
                this.Account.NickName = response.BlogName
                this.Account.ApiUrl = response.ApiUrl;
                this.Next();
            });
    }
}

export class BlogService {
    Id: number;
    Name: string;
    IsSelected: boolean = false;

    constructor(id: number, name: string, selected?: boolean) {
        this.Id = id;
        this.Name = name;
        this.IsSelected = selected;
    }
}
