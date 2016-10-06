import {Injectable, NgZone} from '@angular/core';

import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {ElectronService}            from './ElectronService';
import {ErrorHandlingService}       from './ErrorHandlingService';
import * as Common                  from '../../common/index';

declare var window: any;

@Injectable()
export class ElectronEventService {
    constructor(
        private zone: NgZone,
        private electronService: ElectronService,
        private commandRepository: Common.CommandRepository,
        private errorHandlingService: ErrorHandlingService) {

        // for testing
        electronService.IpcClient.on('mwMain:Log', function (event, arg) {
            console.log('message from server ' + arg);
        });

        // invoke command
        electronService.IpcClient.on('mw:command', function (event, commandName, commandArgument) {
            console.log('Invoking command:  ' + commandName + ' with ' + commandArgument + '.');

            let command = commandRepository.GetCommand(commandName);
            if (command && command.CanExecute(commandArgument)) {
                try {
                    console.log("Get command ${commandName} to invoke.");
                    zone.run(() => {
                        command.Execute(commandArgument);
                    });
                }
                catch (error) {
                    //throw error;
                    errorHandlingService.HandleError(error);
                }
            }
            else {
                console.log("Command '" + commandName + "' is not found.");
            }
        });
    }
    public on(name: string): Observable<any> {
        return Observable.fromEvent(window, name);
    }

    get IpcClient(): any {
        return this.electronService.IpcClient;
    }
    Log(message: string) {
        this.IpcClient.send('mw:log', message);
    }
    OpenFileDialog(title?: string, defaultPath?: string, filters?: any[]): string {
        let paths = this.IpcClient.send('mw:OpenFileDialog', title, defaultPath, filters);
        console.log(paths);
        if (paths && paths.length > 0)
            return paths[0];
        else
            return null;
    }
    ShowMainMenu(): void {
        this.IpcClient.send('mw:ShowMainMenu');
    }
    HideMainMenu(): void {
        this.IpcClient.send('mw:HideMainMenu');
    }
}