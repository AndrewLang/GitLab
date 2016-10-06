
import {XmlRpcParameter}    from './XmlRpcParameter';
import {XmlRpcMember}       from './XmlRpcMember';
import * as Xml             from '../../common/Xml/index';

export class XmlRpcStructParameter extends XmlRpcParameter {

    Members: XmlRpcMember[] = [];
    constructor() {
        super(null);
    }

    ToXml(): Xml.XElement {
        let root = new Xml.XElement("param");
        let valueNode = new Xml.XElement("value");
        let structNode = new Xml.XElement("struct");
        root.AppendChild(valueNode);
        valueNode.AppendChild(structNode);

        for (let item of this.Members) {
            structNode.AppendChild(item.ToXml());
        }

        return root;
    }
    AddMember(member: XmlRpcMember): void {
        this.Members.push(member);
    }
}