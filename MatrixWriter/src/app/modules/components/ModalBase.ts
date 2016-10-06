
import {Input, Output, EventEmitter} from '@angular/core';

import * as Common                  from '../../common/index';

declare var $: any;

export abstract class ModalBase implements Common.IModalView {
    private id: string = 'modal_of_dialog_host';
    @Output() OnClose: EventEmitter<any> = new EventEmitter();
    Title: string;
    LabelCancel: string = "Cancel";
    LabelSubmit: string = "OK";

    Open(): void {
        console.log("open dialog");
        let element = this.getHostId();
        console.log(element);
        element.modal({ backdrop: 'static', show: true });
    }
    OpenDelay(delay: number = 1000) {
        let element = this.getHostId();
        element.modal({ backdrop: 'static', show: true });
        element.on('shown.bs.modal',function(e){
            element.click();
            document.body.click();
            console.log("trigger click");
        });       
    }
    Close(): void {
        console.log("close dialog");
        this.getHostId().modal('hide');
    }
    CanClose(): boolean {
        return true;
    }
    Cancel(): void {
        // Close the dialog directly
        this.CloseInternal();
    }
    UseCancel(): boolean {
        return true;
    }
    Submit(): void {
        this.CloseInternal();
    }
    CanSubmit(): boolean {
        return true;
    }
    UseSubmit(): boolean {
        return true;
    }
    private CloseInternal() {
        this.OnClose.next(null);
        this.Close();
    }
    private getHostId(): any {
        return $('#' + this.id);
    }
}