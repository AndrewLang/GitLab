import { Injectable}                from '@angular/core';
import { Router }                   from '@angular/router';
import * as Common                  from '../../common/index';
import {KnownCommandNames}          from './KnownCommandNames';
import {CommandInitializer}         from './ICommandInitializer';


@Injectable()
export class PostCommandInitizlizer extends CommandInitializer {

    constructor(private mRouter: Router, commandRepository: Common.CommandRepository) {
        super(commandRepository);
    }

    InitializeCommands(): void {
        console.log("Start register command.");
        this.RegisterCommand(KnownCommandNames.NewPost, (param) => {

        });
        this.RegisterCommand(KnownCommandNames.OpenLocalPost, (param) => {

        });
        this.RegisterCommand(KnownCommandNames.SavePost, (param) => {

        });
        // this.RegisterCommand(KnownCommandNames.PublishPost, (param) => {

        // });
        this.RegisterCommand(KnownCommandNames.ShowWelcome, (param) => {
            this.mRouter.navigate(['welcome']);
        });

        console.log("End register command. ");
        console.log(this.CommandRepository.Commands);
    }
}