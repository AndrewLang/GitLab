import * as Models              from '../models/index';
import {XmlRpcParameter}        from './XmlRpcParameter';
import {XmlRpcMember}           from './XmlRpcMember';
import {XmlRpcStructParameter}  from './XmlRpcStructParameter';

export class PostParser {

    ParsePosts(doc: XMLDocument): Array<Models.Post> {
        let posts = new Array<Models.Post>();
        let nodes = doc.querySelector("methodResponse params param value data");
        let names = nodes.querySelectorAll("value struct");
        for (var i = 0; i < names.length; i++) {
            let post = this.ParsePost(names[i]);
            if (post)
                posts.push(post);
        }
        return posts;
    }

    ParsePost(element: Element): Models.Post {
        if (!element)
            return null;

        let post = new Models.Post();

        let names = element.querySelectorAll("member");
        for (var i = 0; i < names.length; i++) {
            let name = names[i].querySelector('name').innerHTML;
            let valueElement = names[i].querySelector('value');

            if (name == "postid") {
                post.PostId = this.ParseValue(valueElement);
            }
            else if (name == "dateCreated") {
                post.DateCreated = this.ParseValue(valueElement);
            }
            else if (name == "title") {
                post.Title = this.ParseValue(valueElement);
            }
            else if (name == "description") {
                post.Description = this.ParseValue(valueElement);
            }
            else if (name == "categoiries") {

            }
            else if (name == "publish") {
                post.Publish = Boolean(this.ParseValue(valueElement));
            }
            else if (name == "userid") {
                post.UserId = this.ParseValue(valueElement);
            }
            else if (name == "link") {
                post.Link = this.ParseValue(valueElement);
            }
            else if (name == "permaLink") {
                post.PermaLink = this.ParseValue(valueElement);
            }
            else if (name == "mt-excerpt") {
                post.Excerpt = this.ParseValue(valueElement);
            }
            else if (name == "mt_text_more") {

            }
            else if (name == "wp_more_text") {

            }
            else if (name == "mt_allow_comments") {
                post.AllowCommants = Boolean(this.ParseValue(valueElement));
            }
            else if (name == "mt_allow_pings") {
                post.AllowPings = Boolean(this.ParseValue(valueElement));
            }
            else if (name == "mt_keywords") {
                post.Keywords = this.ParseValue(valueElement);
            }
            else if (name == "wp_slug") {
                post.Slug = this.ParseValue(valueElement);
            }
            else if (name == "wp_author_display_name") {
                post.AuthorName = this.ParseValue(valueElement);
            }
            else if (name == "date_created_gmt") {
                post.DateCreatedGmt = this.ParseValue(valueElement);
            }
            else if (name == "post_status") {
                post.Status = this.ParseValue(valueElement);
            }
            else if (name == "wp_post_format") {
                post.PostFormat = this.ParseValue(valueElement);
            }
            else if (name == "date_modified") {
                post.DateModified = this.ParseValue(valueElement);
            }
            else if (name == "date_modified_gmt") {
                post.DateModifiedGmt = this.ParseValue(valueElement);
            }
            else if (name == "sticky") {
                post.Sticky = Boolean(this.ParseValue(valueElement));
            }
            else if (name == "wp_post_thumbnail") {
                post.Thumbnail = this.ParseValue(valueElement);
            }
        }
        return post;
    }

    private ParseValue(element: Element): string {
        return element.textContent;
    }

    ParsePublishResponse(element: Element): number {
        let value = element.querySelector("methodResponse params param value string").innerHTML;
        return parseInt(value);
    }

    ToXml(post: Models.Post): XmlRpcStructParameter {
        let struct = new XmlRpcStructParameter();
        if (post.DateCreated)
            struct.AddMember(new XmlRpcMember("DateCreated", post.DateCreated));

        struct.AddMember(new XmlRpcMember("description", post.Description));
        struct.AddMember(new XmlRpcMember("title", post.Title));

        return struct;
    }
}