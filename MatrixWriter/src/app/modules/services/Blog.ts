export class Blog{
    BlogId:string;
    ApiUrl:string;
    HomeUrl:string;
    BlogName:string;
    XmlRpc:string;
    WlwManifest: string;
    Service: string;
    IsAdmin:boolean;    

    ClientType:string;
    SupportsPostAsDraft: boolean;
    SupportsFileUpload: boolean;
    SupportsExtendedEntries:boolean;
    SupportsCustomDate:boolean;
    SupportsCategories:boolean;
    SupportsCategoriesInline:boolean;
    SupportsMultipleCategories:boolean;
    SupportsHierarchicalCategories:boolean;
    SupportsNewCategories:boolean;
    SupportsNewCategoriesInline:boolean;
    SupportsKeywords:boolean;
    SupportsCommentPolicy:boolean;
    SupportsPingPolicy:boolean;
    SupportsAuthor:boolean;
    SupportsSlug:boolean;
    SupportsPassword:boolean;
    SupportsExcerpt:boolean;
    SupportsTrackbacks:boolean;
    SupportsPages:boolean;
    SupportsPageParent:boolean;
    SupportsPageOrder:boolean;
    SupportsGetTags:boolean;

    SupportsEmptyTitles:boolean = true;
    RequiresHtmlTitles = true;
    RequiresXHTML = false;
    SupportsScripts = 'Unknown';
    SupportsEmbeds  = 'Unknown';
    CharacterSet = "UTF-8";
    MaxCategoryNameLength :number = null;
    InvalidPostIdFaultCodePattern = '(None)';
    InvalidPostIdFaultStringPattern = '(None)';
    SupportsAutoUpdate = true;
}