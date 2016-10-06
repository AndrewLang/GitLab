import {Component, OnInit, OnDestroy}        from '@angular/core';
import { Router }                            from '@angular/router';
import * as Common                           from '../../common/index';
import * as Services                         from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/welcome.html'
})
export class WelcomeComponent implements OnInit {

    private mSelectAccount: Services.BlogAccount;
    mAccounts: Services.BlogAccount[];
    RecentPosts: Services.PostFileDescriptor[] = [];

    constructor(private mRouter: Router,
        private mSettingService: Services.SettingService,
        private electronService: Services.ElectronService,
        private electronEvent: Services.ElectronEventService,
        private postFileService: Services.PostFileService) {

    }

    get HasAccount():boolean{
        return this.mAccounts && this.Accounts.length > 0;
    }
    get Accounts(): Services.BlogAccount[] {
        return this.mAccounts;
    }
    get SelectAccount(): Services.BlogAccount {
        return this.mSelectAccount;
    }
    set SelectAccount(value: Services.BlogAccount) {
        this.mSelectAccount = value;
    }

    ngOnInit() {
        this.mSettingService.LoadSettings()
            .then(response => {
                console.log(response);
                console.log(this.mSettingService.Setting);
                this.mAccounts = this.mSettingService.Setting.BlogAccounts;
                this.SelectAccount = this.mSettingService.DefaultAccount;
                this.RecentPosts = this.mSettingService.Setting.RecentPosts;
            });
        this.electronEvent.Log("Welcome use Matrix Writer");
        //this.electronEvent.HideMainMenu();
    }

    CreatePost() {
        this.mRouter.navigate(['editor', '']);
    }
    OpenPostFromFolder(): void {
        this.postFileService.OpenPostFromFile()
            .then(file => {
                console.log( "file to open " + file ); 
                this.mRouter.navigate(['editor', file]); })
            .catch(reason => { console.log(reason); });

    }
    OpenPost(postFile: Services.PostFileDescriptor): void {
        if (!postFile)
            return;
        this.mRouter.navigate(['editor', postFile.FullName]);
    }
    CreateAccount() {
        this.mRouter.navigate(['createAccount']);
    }
}