import {XmlRpcMethod}   from './XmlRpcMethod';
import {XmlRpcError}    from './XmlRpcError';
import {PostParser}     from './PostParser';
import * as Models      from '../models/index';
import {XmlRpcResponseMember}   from'./XmlRpcResponseMember';

export class XmlRpcRequest {
    self: XmlRpcRequest = this;
    mPostParser: PostParser = new PostParser();

    Send(url: string, method: XmlRpcMethod): Promise<any> {
        if (!method)
            throw new XmlRpcError();

        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            let request = method.ToRequest();

            console.log(url);
            console.log(request);

            xmlHttp.open("POST", url, true);
            xmlHttp.send(request);

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    console.log("Response:")
                    console.log(xmlHttp.response);
                    resolve(xmlHttp.responseXML);
                }
            };
        });
    }

    GetPost(url: string, method: XmlRpcMethod): Promise<Models.Post> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method).then(response => {
                //console.log(response);
                //resolve(self.ParseToPost(response));
                resolve(self.mPostParser.ParsePost(response));
            });
        });
    }
    NewPost(url: string, method: XmlRpcMethod): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method)
                .then(response => {
                    resolve(self.mPostParser.ParsePublishResponse(response));
                })
                .catch(reason => { reject(reason); });
        });
    }
    EditPost( url : string, method: XmlRpcMethod):Promise<any>{
            let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method)
                .then(response => {
                    resolve(response);
                })
                .catch(reason => { reject(reason); });
        });    
    }

    GetRecentPosts(url: string, method: XmlRpcMethod): Promise<Array<Models.Post>> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.Send(url, method).then(response => {
                //console.log(response);
                //resolve(self.ParseToPost(response));
                resolve(self.mPostParser.ParsePosts(response));
            });
        });
    }
}