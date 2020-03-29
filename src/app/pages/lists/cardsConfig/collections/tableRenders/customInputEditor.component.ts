import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
    template: `
    <div class="align-center">
          <span>{{cell.getRow().getData().agreement.code}} / {{cell.getRow().getData().agreement.versionAgreement}}</span>
    </div>
    `,
    styleUrls: ['./customStyle.scss'],
})

export class CustomInputEditorComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('fieldName', null) name: ElementRef;

    constructor() {
        super();
    }

    ngAfterViewInit() {
    }

}
