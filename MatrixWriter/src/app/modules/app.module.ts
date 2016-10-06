import { NgModule}                          from '@angular/core';
import { BrowserModule}                     from '@angular/platform-browser';
import { Routes, RouterModule }             from '@angular/router';
import { JsonpModule, HttpModule}           from '@angular/http';
import { FormsModule }                      from '@angular/forms';

import *  as Components                     from './components/index';
import *  as Services                       from './services/index';
import *  as Common                         from '../common/command/index';
import { routing, appRoutingProviders }     from './app.routing';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, JsonpModule, routing],
    declarations: [Components.AppComponent, Components.WelcomeComponent, Components.PostEditorComponent,
        Components.CreateAccountComponent, Components.PostPublishComponent],
    entryComponents: [Components.PostPublishComponent],
    providers: [
        Common.CommandRepository,
        Services.DataService, Services.ErrorHandlingService, Services.MetaweblogService,
        Services.DialogService, Services.ElectronService, Services.SettingService,
        Services.ComponentCreator, Services.PostManageService, Services.MetaweblogDetector,
        Services.PostFileService, Services.ElectronEventService, Services.HtmlEditorService,
        Services.EditorCommandInitializer, Services.PostCommandInitizlizer, Services.CommandsService,
        Services.LogService,
        appRoutingProviders,],
    bootstrap: [Components.AppComponent]
})
export class AppModule { }