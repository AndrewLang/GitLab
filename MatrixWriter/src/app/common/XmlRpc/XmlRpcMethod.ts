import {XmlRpcParameter}    from './XmlRpcParameter';
import * as Xml             from '../../common/Xml/index';
import * as Models          from '../../common/models/index';

export class XmlRpcMethod {
    Name: string;
    Params: Array<XmlRpcParameter> = [];

    AddStringParameter(value: string): XmlRpcMethod {
        this.Params.push(new XmlRpcParameter(value));
        return this;
    }
    AddBoolParameter(value:boolean): XmlRpcMethod{
        this.Params.push(new XmlRpcParameter(value.toString()));
        return this;
    }
    AddParameter(param: XmlRpcParameter): XmlRpcMethod {
        this.Params.push(param);
        return this;
    }


    ToRequest(): XMLDocument {
        let doc = new Xml.XDocument();
        let root = new Xml.XElement("methodCall");
        doc.AppendChild(root);

        root.AppendChild(new Xml.XElement("methodName", this.Name))
        let params = new Xml.XElement("params");
        root.AppendChild(params);

        this.Params.forEach(function (param) {
            params.AppendChild(param.ToXml());
        });

        return doc.Build();
    }
}