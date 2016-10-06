/*
*/
import { ModuleWithProviders }              from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import *  as Components                     from './components/index';

const rootRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: Components.WelcomeComponent },
    { path: 'editor/:file', component: Components.PostEditorComponent },
    { path: 'home', component: Components.AppComponent },
    { path: 'createAccount', component: Components.CreateAccountComponent }
];

const appRoutes: Routes = [
    ...rootRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);