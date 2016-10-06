
import { Injectable}    from '@angular/core';
import {Http, Headers}  from '@angular/http';
import 'rxjs/Rx';

import * as Common      from '../../common/index';
import {Blog}           from './Blog';
import {BlogAccount}    from './BlogAccount'
import {IBlogDetector}  from './IBlogDetector';
import {DataService}    from './DataService';
import {LogService}     from './LogService';

@Injectable()
export class MetaweblogDetector implements IBlogDetector {

    constructor(
        private dataService: DataService,
        private logService: LogService) { }

    Detect(account: BlogAccount): Promise<Blog> {
        if (!this.dataService)
            throw new Error("Data server is not found.");

        let self = this;
        let parser = new DOMParser();
        let blog = new Blog();
        blog.HomeUrl = account.HomeUrl;

        return new Promise(function (resolve, reject) {
            self.logService.LogMessage("start Detect");
            self.dataService.GetAsync(account.HomeUrl)
                .then(response => {
                    self.logService.Log('process document', response);

                    var doc = parser.parseFromString(response._body, "text/html");

                    let title = doc.querySelector("title").innerHTML;
                    if (title)
                        title = title.split(" ")[0];
                    let rsdLink = doc.querySelector("link[title=RSD]").getAttribute("href");
                    let wlwManifestLink = doc.querySelector("link[rel=wlwmanifest]").getAttribute("href");

                    self.logService.Log('RSD link ', rsdLink);
                    self.logService.Log('WlwManifest link ', wlwManifestLink);

                    blog.XmlRpc = rsdLink;
                    blog.WlwManifest = wlwManifestLink;
                    blog.BlogName = title;

                    return self.dataService.GetAsync(rsdLink);
                })
                .then(response => {
                    self.logService.Log('process RSD response', response);

                    let xml = parser.parseFromString(response._body, "text/xml");
                    let apiLink = xml.querySelector("service apis api[preferred='true']").getAttribute("apiLink");

                    if (!apiLink)
                        apiLink = xml.querySelector("service apis api").getAttribute("apiLink");

                    blog.ApiUrl = apiLink;

                    return self.dataService.GetAsync(blog.WlwManifest);
                })
                .then(response => {
                    let xml = parser.parseFromString(response._body, "text/xml");
                    let options = xml.querySelector("manifest options").childNodes;

                    self.ParseManifest(blog, options);

                    resolve(blog);
                })
                .catch(error => {
                    self.logService.LogMessage(error);
                    reject(error);
                });


        });

    }

    private ParseManifest(blog: Blog, options: NodeList) {
        let properties: { [name: string]: (value) => void; } = {};
        properties["clientType"] = (value) => { blog.ClientType = value; };
        properties["supportsPostAsDraft"] = (value) => { blog.SupportsPostAsDraft = value; };
        properties["supportsFileUpload"] = (value) => { blog.SupportsFileUpload = value; };
        properties["supportsExtendedEntries"] = (value) => { blog.SupportsExtendedEntries = value; };
        properties["supportsCustomDate"] = (value) => { blog.SupportsCustomDate = value; };
        properties["supportsCategories"] = (value) => { blog.SupportsCategories = value; };
        properties["supportsCategoriesInline"] = (value) => { blog.SupportsCategoriesInline = value; };
        properties["supportsMultipleCategories"] = (value) => { blog.SupportsMultipleCategories = value; };
        properties["supportsHierarchicalCategories"] = (value) => { blog.SupportsHierarchicalCategories = value; };
        properties["supportsNewCategories"] = (value) => { blog.SupportsNewCategories = value; };
        properties["supportsNewCategoriesInline"] = (value) => { blog.SupportsNewCategoriesInline = value; };
        properties["supportsKeywords"] = (value) => { blog.SupportsKeywords = value; };
        properties["supportsCommentPolicy"] = (value) => { blog.SupportsCommentPolicy = value; };
        properties["supportsPingPolicy"] = (value) => { blog.SupportsPingPolicy = value; };
        properties["supportsAuthor"] = (value) => { blog.SupportsAuthor = value; };
        properties["supportsSlug"] = (value) => { blog.SupportsSlug = value; };
        properties["supportsPassword"] = (value) => { blog.SupportsPassword = value; };
        properties["supportsExcerpt"] = (value) => { blog.SupportsExcerpt = value; };
        properties["supportsTrackbacks"] = (value) => { blog.SupportsTrackbacks = value; };
        properties["supportsPages"] = (value) => { blog.SupportsPages = value; };
        properties["supportsPageParent"] = (value) => { blog.SupportsPageParent = value; };
        properties["supportsPageOrder"] = (value) => { blog.SupportsPageOrder = value; };
        properties["supportsEmptyTitles"] = (value) => { blog.SupportsEmptyTitles = value; };
        properties["requiresHtmlTitles"] = (value) => { blog.RequiresHtmlTitles = value; };
        properties["requiresXHTML"] = (value) => { blog.RequiresXHTML = value; };
        properties["supportsScripts"] = (value) => { blog.SupportsScripts = value; };
        properties["supportsEmbeds"] = (value) => { blog.SupportsEmbeds = value; };
        properties["characterSet"] = (value) => { blog.CharacterSet = value; };
        properties["maxCategoryNameLength"] = (value) => { blog.MaxCategoryNameLength = value; };
        properties["invalidPostIdFaultCodePattern"] = (value) => { blog.InvalidPostIdFaultCodePattern = value; };
        properties["invalidPostIdFaultStringPattern"] = (value) => { blog.InvalidPostIdFaultStringPattern = value; };
        properties["supportsAutoUpdate"] = (value) => { blog.SupportsAutoUpdate = value; };
        properties["supportsGetTags"] = (value) => { blog.SupportsGetTags = value; };

        
        for (var i = 0; i < options.length; i++) {
            let name = options[i].nodeName;
            let value = options[i].textContent;

            let action = properties[name];
            if (action)
                action(value);
        }
    }
    private ApplyWordpressPreset(properties: { [name: string]: (value) => void; }){

    }
    private ApplyMetaweblogPreset(properties: { [name: string]: (value) => void; }){
        
    }
    private ApplyMovableTypePreset(properties: { [name: string]: (value) => void; }){
        
    }
}