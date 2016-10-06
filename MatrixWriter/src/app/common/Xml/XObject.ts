import {XDocument } from './XDocument';

export class XObject {
    Name: string;
    Value: any;
    private mXDoc: XDocument;

    get Parent() {
        return this.mXDoc;
    }
    set Parent(value: XDocument) {
        this.mXDoc = value;
    }

    /**
     *
     */
    constructor(name: string, value: any) {
        this.Name = name;
        this.Value = value;
    }

}
