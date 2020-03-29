import { Component, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
import { EventEmitter } from 'events';

@Component({
    template: `
    <label>{{renderValue}}</label>
    `
})
export class FieldEditorComponent extends DefaultEditor implements AfterViewInit {

    renderValue = 'true';
    @ViewChild('fieldName', { static: true }) name: ElementRef;
    @Output() valueChanged = new EventEmitter();

    constructor() {
        super();
    }

    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
            const fieldObj = this.cell.getValue();
            console.log('fieldObj', fieldObj);
            const display = fieldObj.display;
            let code = display || fieldObj.property;
            if (fieldObj.mandatory) {
                code = `${code} *`;
            }
            this.renderValue = code;
        }
    }

}
