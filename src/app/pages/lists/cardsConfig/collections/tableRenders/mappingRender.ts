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
export class MappingRenderComponent implements ViewCell, OnInit {

    renderValue: string;
    fieldClass;

    @Input() value;
    @Input() rowData: any;

    ngOnInit() {
        console.log('rowData', this.rowData);
        console.log('value', this.value);
        const mappingValue = this.value.value;
        console.log('mappingValue', mappingValue);
        let mappingLabel = '';
        if (mappingValue) {
            const type = this.value.type;
            console.log('type', type);
            switch (type) {
                case 'calculated':
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

        console.log('mappingLabel', mappingLabel);
        this.renderValue = mappingLabel;
    }
}
