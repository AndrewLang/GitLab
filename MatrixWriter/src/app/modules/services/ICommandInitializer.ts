import * as Common                  from '../../common/index';

export interface ICommandInitializer {
    InitializeCommands(): void;
}

export abstract class CommandInitializer implements ICommandInitializer{
    private mCommandRepository;

    constructor(commandRepository: Common.CommandRepository) {
        this.mCommandRepository = commandRepository;
    }

    get CommandRepository(): Common.CommandRepository{
        return this.mCommandRepository;
    }

    abstract InitializeCommands() : void;

    RegisterCommand(name: string, execute: (param: any) => void, canExecute?: (param: any) => boolean): void {
        let canExcecutePredicate = canExecute;
        if (!canExcecutePredicate)
            canExcecutePredicate = (param: any) => true;

        this.mCommandRepository.Register(name, new Common.DelegateCommand(canExcecutePredicate, execute));
    }
}