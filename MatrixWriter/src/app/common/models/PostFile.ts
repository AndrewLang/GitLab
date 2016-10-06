import {Post}                   from './Post';
import {BlogInfo}               from './BlogInfo';
import {MediaObject}            from './MediaObject';
import {PostPublishHistory}     from './PostPublishHistory';

export class PostFile {
    static DefaultExtension = ".mpost";

    PostTitle: string;
    CreatedDate: string;


    BlogInfo: BlogInfo;
    Post: Post = new Post();
    MediaObjects: MediaObject[] = [];
    History: PostPublishHistory[] = [];

    get IsPublished(): boolean {
        return this.History != null
            && this.History.length > 0;
    }

    HasPublishedTo(apiUrl: string): boolean {
        console.log( "URL: " + apiUrl);
        let self = this;
        if (!apiUrl)
            return false;

        return self.History != null
            && self.History.length > 0
            && self.History.some(x => x.Blog == apiUrl);
    }

    RecordPublish(record: PostPublishHistory): void {
        if (!record)
            return;

        this.History.push(record);
    }
}