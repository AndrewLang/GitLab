import * as Xml             from '../../common/Xml/index';

export class XmlRpcParameter {
    private mValue: string;
    constructor(value: string) {
        this.mValue = value;
    }

    GetValue(): any {
        return this.mValue;
    }
    ToXml(): Xml.XElement {
        return new Xml.XElement("param")
            .AppendChild(new Xml.XElement("value")
                .AppendChild(new Xml.XElement("string", this.mValue)));
    }

}