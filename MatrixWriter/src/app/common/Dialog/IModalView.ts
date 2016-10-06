
import{EventEmitter} from '@angular/core';

export interface IModalView {
    Open(): void;
    Close(): void;
    OnClose: EventEmitter<any>;
}