import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <label [ngClass]="fieldClass">
    {{renderValue}}
    </label>
  `,
    styleUrls: ['./customStyle.scss'],
})
export class FieldRenderComponent implements ViewCell, OnInit {

    renderValue: string;
    fieldClass;

    @Input() value;
    @Input() rowData: any;

    ngOnInit() {
        const display = this.value.display;
        let code = display || this.value.property;
        if (this.value.mandatory) {
            code = `${code} *`;
        }
        if (this.value.mandatory && !this.isMapped()) {
            this.fieldClass = 'missingMapping';
        }
        this.renderValue = code;
    }

    isMapped() {
        if (this.rowData && this.rowData.mapping && this.rowData.mapping.value) {
            return true;
        }
        return false;
    }
}
