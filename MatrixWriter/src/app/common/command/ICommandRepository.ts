
import {ICommand}   from './ICommand';


export interface ICommandRepository {
    Commands: { [name: string]: ICommand; };

    GetCommand(name: string): ICommand;

    Register(name: string, command: ICommand):void;
}



export class CommandRepository implements ICommandRepository {
    Commands: { [name: string]: ICommand; } = {};

    GetCommand(name: string): ICommand {
        
        let command:ICommand = this.Commands[name] ;

        return command;
    }

    Register(name: string, command: ICommand):void {
        if (!name)
            throw new Error("Name value is null.");
        if (!command)
            throw new Error("Command value is null.")

        this.Commands[name] = command;
    }
}