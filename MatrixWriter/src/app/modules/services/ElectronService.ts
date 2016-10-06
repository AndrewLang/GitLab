import {Injectable} from '@angular/core';

declare var electron: any;
declare var fs: any;
declare var Cryptr: any;
declare var NjPath: any;

@Injectable()
export class ElectronService {
    algorithm = 'aes-256-ctr';
    password = 'a3b8d9w34';

    get Electron(): any {
        return electron;
    }
    get App(): any {
        return electron.remote.app;
    }
    get MainMenu(): any {
        return electron.remote.Menu;
    }
    get IpcClient(): any {
        return electron.ipcRenderer;
    }
    GetUserDataFolder(): string {
        return this.App.getPath('userData');
    }
    GetAppDataFolder(): string {
        return this.App.getPath('appData');
    }
    GetMyDocumentFolder(): string {
        return this.App.getPath('documents');
    }
    GetPictureFolder(): string {
        return this.App.getPath('pictures');
    }
    GetAppName():string{
        return this.App.getName();
    }
    OpenFileDialog(filters: any = null): string {
        let fileName = electron.remote.showOpenDialog({
            properties: ['openFile', 'openDirectory'],
            filters: filters
        });
        return fileName;
    }
    SetApplicationMenu(menu: any): void {
        electron.remote.Menu.setApplicationMenu(menu);
    }

    OpenExternal(url: string): void {
        electron.remote.shell.openExternal(url);
    }
    ShowItemInFolder(path: string): void {
        electron.remote.shell.showItemInFolder(path);
    }

    ReadFileAsync(file: string): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (!self.Exist(file))
                reject(new Error("File doesn't exist."));

            fs.readFile(file, 'utf8', (error, data) => {
                if (error)
                    reject(error);
                resolve(data);
            });
        });
    }

    WriteFileAsync(file: string, data: any): Promise<any> {
        console.log("Write data to file.");
        console.log(file);
        console.log(data);
        let self = this;
        return new Promise(function (resolve, reject) {
            fs.writeFile(file, data, (error) => {
                if (error)
                    reject(error);

                resolve(true);
            });
        });
    }

    Encrypt(value: string): string {
        let cipher = Cryptr.createCipher(this.algorithm, this.password);
        let crypted = cipher.update(value, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    Decrypt(value: string): string {
        var decipher = Cryptr.createDecipher(this.algorithm, this.password)
        var dec = decipher.update(value, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    Exist(path: string): boolean {
        try {
            fs.accessSync(path, fs.F_OK);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    EnsureFolderExist(path: string): void {
        if (!this.Exist(path)) {
            try {
                fs.mkdirSync(path);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    CombinePath(base: string, paths: string): string {
        let value: string;
        try {            
            value = NjPath.join(base, paths);
        }
        catch (error) {
            console.log(error);
        }
        return value;
    }
    NormalizePath(path: string): string {
        return NjPath.normalize(path);
    }
}