import {XmlRpcMethod}       from './XmlRpcMethod';
import * as Models          from '../models/index';
import {PostParser}         from './PostParser';
import {MetaweblogNames}    from './MetaweblogNames'

export class MetaweblogMethods {

    GetPost(postId: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = MetaweblogNames.GetPost;// "metaWeblog.getPost";
        method.AddStringParameter(postId)
            .AddStringParameter(user)
            .AddStringParameter(password);
        return method;
    }

    GetRecentPosts(blogId: string, user: string, password: string, numberoOfPosts?: number): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = MetaweblogNames.GetRecentPosts;// "metaWeblog.getRecentPosts";
        method.AddStringParameter(blogId)
            .AddStringParameter(user)
            .AddStringParameter(password);

        if (numberoOfPosts)
            method.AddStringParameter(numberoOfPosts.toString());

        return method;
    }

    GetUserInfo(id: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.getPost";
        method.AddStringParameter(id)
            .AddStringParameter(user)
            .AddStringParameter(password)
            ;
        return method;
    }

    NewPost(blogId: string, user: string, password: string, post: Models.Post, publish: boolean = true): XmlRpcMethod {
        let method = new XmlRpcMethod();
        let parser = new PostParser();
        method.Name = MetaweblogNames.NewPost;// "metaWeblog.newPost";
        method.AddStringParameter(blogId)
            .AddStringParameter(user)
            .AddStringParameter(password)
            .AddParameter(parser.ToXml(post))
            .AddBoolParameter(publish)
            ;
        return method;
    }
    EditPost(postId: string, user: string, password: string, post: Models.Post, publish: boolean = true): XmlRpcMethod {
        let method = new XmlRpcMethod();
        let parser = new PostParser();
        method.Name = MetaweblogNames.EditPost;// "metaWeblog.editPost";
        method.AddStringParameter(postId)
            .AddStringParameter(user)
            .AddStringParameter(password)
            .AddParameter(parser.ToXml(post))
            .AddBoolParameter(publish);
        return method;
    }
    DeletePost(appKey: string, postId: string, user: string, password: string, publish: boolean): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = MetaweblogNames.DeletePost;// "metaWeblog.deletePost";
        method.AddStringParameter(postId)
            .AddStringParameter(user)
            .AddStringParameter(password);
        return method;
    }
    GetCategories(blogId: string, user: string, password: string) {
        let method = new XmlRpcMethod();
        method.Name = MetaweblogNames.GetCategories;// "metaWeblog.getCategories";
        method.AddStringParameter(blogId)
            .AddStringParameter(user)
            .AddStringParameter(password);
        return method;
    }
    NewMediaObject(blogId: string, user: string, password: string) {
        let method = new XmlRpcMethod();
        method.Name = MetaweblogNames.NewMediaObject;// "metaWeblog.newMediaObject";
        method.AddStringParameter(blogId)
            .AddStringParameter(user)
            .AddStringParameter(password);
        return method;
    }
    GetUserBlogs(appKey: string, user: string, password: string): XmlRpcMethod {
        let method = new XmlRpcMethod();
        method.Name = "metaWeblog.newMediaObject";
        method.AddStringParameter(appKey)
            .AddStringParameter(user)
            .AddStringParameter(password);
        return method;
    }
}