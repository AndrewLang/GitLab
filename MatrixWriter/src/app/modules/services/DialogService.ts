import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';

import {ComponentCreator}           from './ComponentCreator';

import * as Common                  from '../../common/index';

@Injectable()
export class DialogService {

    constructor(private mComponentCreator: ComponentCreator) { }

    ShowDialog(componentType: Type<{}>): void {
        console.log(componentType);

        let component = this.CreateComponent(componentType);
        let modalView = component.instance as Common.IModalView;

        if (modalView) {
            modalView.Open();
            modalView.OnClose.subscribe(() => {
                component.destroy();
            });
        }
    }

    private CreateComponent(componentType: Type<{}>): ComponentRef<{}> {
        try {
            let factory = this.mComponentCreator.ComponentFactoryResolver.resolveComponentFactory(componentType);
            console.log(factory);
            let component = this.mComponentCreator.ViewContainer.createComponent(factory);
            console.log(component);

            return component;
        }
        catch (error) {
            console.log('Create component error.');
            console.log(error);
            return null;
        }
    }
}