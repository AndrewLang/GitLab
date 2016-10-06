
export interface ICommand {

    CanExecute(param: any): boolean;

    Execute(param: any): void;
}

export class DelegateCommand implements ICommand {

    constructor(private canExecute: (param: any) => boolean,
        private action: (param: any) => void) {

    }

    CanExecute(param: any): boolean {
        return this.canExecute && this.canExecute(param);
    }

    Execute(param: any): void {
        if (this.action) {
            try {
                this.action(param);
            }
            catch (error) {
                throw error;
            }
        }
    }
}