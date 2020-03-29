import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
    <label [ngClass]="fieldClass">
    {{renderValue}}
    </label>
  `
})
export class ConcatenationRenderComponent implements ViewCell, OnInit {

    renderValue: string;
    fieldClass;

    @Input() value;
    @Input() rowData: any;

    ngOnInit() {
        const mappingValue = this.value.value;
        let mappingLabel = '';
        if (mappingValue) {
            const type = this.value.type;
            switch (type) {
                case 'constant':
                    mappingLabel = mappingValue.code;
                    break;
                case 'field':
                    const dataGroup = mappingValue.dataGroup;
                    const field = mappingValue.field;
                    if (dataGroup && field) {
                        mappingLabel = `${dataGroup}: ${field}`;
                    }
                    break;
            }
        }
        this.renderValue = mappingLabel;
    }
}
