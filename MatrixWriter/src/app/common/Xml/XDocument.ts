import {XElement} from './XElement';

export class XDocument {

    Elements: Array<XElement> = [];

    Build(): XMLDocument {
        var doc = document.implementation.createDocument("", "", null);
        this.Elements.forEach(function (element) {
            doc.appendChild(element.ToXmlElement(doc));
        });
        return doc;
    }

    AppendChild(element: XElement): XDocument {
        if (!element)
            throw new Error('element is null.');

        this.Elements.push(element);
        element.Parent = this;
        return this;
    }

}