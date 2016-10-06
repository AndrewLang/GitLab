import {XmlRpcParameter}     from './XmlRpcParameter';
import * as Xml             from '../../common/Xml/index';

export class XmlRpcMember extends XmlRpcParameter {
    Name: string;
    Value: any;

    constructor(name: string, value: any) {
        super(value);
        this.Name = name;
        this.Value = value;
    }

    ToXml(): Xml.XElement {
        return new Xml.XElement("member")
            .AppendChild(new Xml.XElement("name", this.Name))
            .AppendChild(new Xml.XElement("value", this.Value));
    }
}