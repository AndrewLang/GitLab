import {Injectable, ViewContainerRef, ComponentFactoryResolver }          from '@angular/core';

@Injectable()
export class ComponentCreator{
    private mViewContainer:ViewContainerRef;
    private mComponentFactoryResolver:ComponentFactoryResolver;

    get ViewContainer():ViewContainerRef{
        return this.mViewContainer;
    }
    set ViewContainer(value:ViewContainerRef){
        this.mViewContainer = value;
    }

    get ComponentFactoryResolver():ComponentFactoryResolver{
        return this.mComponentFactoryResolver;
    }
    set ComponentFactoryResolver(value:ComponentFactoryResolver){
        this.mComponentFactoryResolver = value;
    }
}