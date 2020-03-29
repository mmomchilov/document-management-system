import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
    template: `
    <div class="align-center">
        <label class="checkbox-inline custom-checkbox nowrap">
            <input #check type="checkbox" [checked]="cell.getRow().getData().selected" (change)="onChangeValue(check.checked)">
            <span></span>
        </label>
    </div>
    `,
    styleUrls: ['./customStyle.scss'],
})

export class CustomCheckboxEditorComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('check', null) check: ElementRef;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor() {
        super();
    }

    ngAfterViewInit() {
      this.cell.newValue = this.cell.getValue();
    }

    onChangeValue(event) {
        console.log('event!!!!!!!!!!!!!!!!!!', event);
      this.cell.newValue = event;
    }

}
