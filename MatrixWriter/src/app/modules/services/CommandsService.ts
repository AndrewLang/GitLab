import { Injectable}                from '@angular/core';

import {EditorCommandInitializer}   from './EditorCommandInitializer';
import {ICommandInitializer}        from './ICommandInitializer';
import {PostCommandInitizlizer}     from './PostCommandInitizlizer';

@Injectable()
export class CommandsService {
    private mInitializers: ICommandInitializer[] = [];

    constructor(editorCommandInitializer: EditorCommandInitializer,
    postCommandinitializer:PostCommandInitizlizer) {

        this.mInitializers.push(editorCommandInitializer);
        this.mInitializers.push(postCommandinitializer);
    }

    Initialize(): void {
        for (let initializer of this.mInitializers) {
            initializer.InitializeCommands();
        }
    }
}