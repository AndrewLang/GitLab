import { Injectable} from '@angular/core';

//const xmlrpc = require('xmlrpc');

@Injectable()
export class MetaweblogService {

    mClient: any;

    constructor() {
        //this.mClient = xmlrpc.createClient({});
    }

    methodCall(methodName, params): Promise<any> {
        return new Promise(function (resolve, reject) {
            this.mClient.methodCall(methodName, params, function (error, data) {
                if (!error) {
                    resolve(data);
                } else {
                    reject(error);
                }
            });
        });
    }

    getUsersBlogs (appKey, username, password) : Promise<any>{
        return this.methodCall('blogger.getUsersBlogs', [appKey, username, password]);
    }
    getRecentPosts (blogid, username, password, numberOfPosts): Promise<any> {
        return this.methodCall('metaWeblog.getRecentPosts', [blogid, username, password, numberOfPosts]);
    }
    getCategories (blogid, username, password) : Promise<any>{
        return this.methodCall('metaWeblog.getCategories', [blogid, username, password]);
    }
    getPost (postid, username, password) : Promise<any>{
        return this.methodCall('metaWeblog.getPost', [postid, username, password]);
    } 
    editPost (postid, username, password, post, publish) : Promise<any>{
        return this.methodCall('metaWeblog.editPost', [postid, username, password, post, publish]);
    }
    newPost (blogid, username, password, post, publish) : Promise<any>{
        return this.methodCall('metaWeblog.newPost', [blogid, username, password, post, publish]);
    }
    deletePost (appKey, postid, username, password, publish): Promise<any> {
        return this.methodCall('blogger.deletePost', [appKey, postid, username, password, publish]);
    }
    newMediaObject (blogid, username, password, mediaObject) : Promise<any>{
        return this.methodCall('metaWeblog.newMediaObject', [blogid, username, password, mediaObject]);
    }
}