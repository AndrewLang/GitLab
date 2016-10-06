import {Injectable}                 from '@angular/core';
import * as Common                  from '../../common/index';
import {ElectronService}            from './ElectronService';
import {SettingService}             from './SettingService';
import {PostFileDescriptor}         from './PostFileDescriptor';
import {ElectronEventService}       from './ElectronEventService';



@Injectable()
export class PostFileService {
    static DefaultExtension = ".mpost";
    static ShortExtension = "mpost";

    constructor(private electronService: ElectronService,
        private settingService: SettingService,
        private electronEvent: ElectronEventService) { }

    Save(post: Common.PostFile): Promise<boolean> {
        if (!post)
            throw new Error("Given post is null.")

        let folder = post.IsPublished? this.GetPostDataFolder() : this.GetDraftFolder();
        let file = this.electronService.CombinePath(folder, post.PostTitle);
        file = this.GenerateFilename(file, PostFileService.DefaultExtension);

        let content = JSON.stringify(post, null, '\t');
        let self = this;
        return new Promise(function (resolve, reject) {
            self.electronService.WriteFileAsync(file, content)
                .then(response => {
                    // Save to recent file list
                    let postFile = new PostFileDescriptor();
                    postFile.CreatedDate = post.CreatedDate.toString();// new Date(Date.now().toString());
                    postFile.Name = post.PostTitle;
                    postFile.FullName = file;

                    console.log(self.settingService);
                    self.settingService.AddRecentPost(postFile);
                    self.settingService.SaveSettings();

                    resolve(true);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    Load(file: string): Promise<Common.PostFile> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.electronService.ReadFileAsync(file)
                .then(response => {
                    let postFile = JSON.parse(response);
                    resolve(postFile);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    OpenPostFromFile(): Promise<string> {
        let self = this;
        return new Promise(function (resolve, reject) {
            let defaultFolder = self.GetPostDataFolder();
            let filter = [{ name: "Post file", extensions: [PostFileService.ShortExtension] }];
            let fileName = self.electronEvent.OpenFileDialog("Open a Post", defaultFolder, filter);
            console.log( fileName);
            resolve(fileName);
        });
    }
    private GetPostFolder(): string {
        let documentPath = this.electronService.CombinePath(this.electronService.GetMyDocumentFolder(), "My Posts");
        this.electronService.EnsureFolderExist(documentPath);
        return documentPath;
    }
    private GetPostDataFolder(): string {
        let documentPath = this.electronService.CombinePath(this.GetPostFolder(), "Recents");
        this.electronService.EnsureFolderExist(documentPath);
        return documentPath;
    }
    private GetDraftFolder(): string {
        let documentPath = this.electronService.CombinePath(this.GetPostFolder(), "Drafts");
        this.electronService.EnsureFolderExist(documentPath);
        return documentPath;
    }
    private GenerateFilename(file: string, extension: string): string {
        let fullname = file + extension;
        if (!this.electronService.Exist(fullname))
            return fullname;

        let index = 1;

        while (this.electronService.Exist(fullname)) {
            fullname = file + ' (' + index + ')' + extension;
            index++;
        }
        return fullname;
    }
}