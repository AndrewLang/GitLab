import {Component, OnInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver }        from '@angular/core';

import * as Services                from '../services/index';

@Component({
    selector: 'app',
    templateUrl: 'src/views/home.html'
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private componentCreator: Services.ComponentCreator,
        private commandService: Services.CommandsService) {

        componentCreator.ViewContainer = viewContainer;
        componentCreator.ComponentFactoryResolver = componentFactoryResolver;

    }

    ngOnInit() {
        this.commandService.Initialize();
    }
    ngOnDestroy() {

    }
}