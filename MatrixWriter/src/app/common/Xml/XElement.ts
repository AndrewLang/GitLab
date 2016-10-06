import {XObject}        from './XObject';
import {XAttribute}     from './XAttribute';

export class XElement extends XObject {
    Elements: Array<XElement> = [];
    Attributes: Array<XAttribute> = [];

    constructor(name: string, value: any = null ) {
        super(name, value);
    }

    AppendChild(element: XElement) :XElement{
        if (!element)
            throw new Error('element is null.');

        this.Elements.push(element);
        element.Parent = this.Parent;
        return this;
    }
    AppendAttribute(attribute: XAttribute) {
        if (!attribute)
            throw new Error('attribute is null.');

        this.Attributes.push(attribute);
        attribute.Parent = this.Parent;
    }
    ToXmlElement(doc: XMLDocument): HTMLElement {
        let element = doc.createElement(this.Name);
        if (this.Value) {
            element.appendChild(doc.createTextNode(this.Value));
        }

        this.Attributes.forEach(function (attribute) {
            element.setAttribute(attribute.Name, attribute.Value);
        });
        this.Elements.forEach(function (child) {
            element.appendChild(child.ToXmlElement(doc));
        });

        return element;
    }
}
