import { Component, Input, Output, ElementRef, EventEmitter, AfterViewInit, OnInit } from '@angular/core';


declare var $: any;

@Component({
    //selector: 'modal',
    templateUrl: 'src/views/modal.html',
})
export class Modal implements OnInit, AfterViewInit {

    @Input() title: string = "Title";
    @Input() showClose: boolean = true;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    
    private id: string = 'modal_of_dialog_host';

    constructor(private rotNode: ElementRef) {
      
    }

    open() {
        this.getHost().modal('show');
    }

    close() {
        this.getHost().modal('hide');
    }

    closeInternal() {
        this.onClose.next(null);
        this.close();
    }
    ngOnInit(): any {

    }
    ngAfterViewInit(): void {

    }

    private getHost(): any {
        return $('#'+this.id);
    }
}

