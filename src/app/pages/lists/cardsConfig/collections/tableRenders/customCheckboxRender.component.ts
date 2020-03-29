import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="align-center">
        <label class="checkbox-inline custom-checkbox nowrap">
            <input #check type="checkbox" [checked]="renderValue" [disabled]="true">
            <span></span>
        </label>
    </div>
  `,
  styleUrls: ['./customStyle.scss'],
})

export class CustomCheckboxRenderComponent implements ViewCell, OnInit {

  renderValue: boolean;

  @Input() value;
  @Input() rowData: any;
  @Output() change: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value;
    console.log('this.value', this.value);
    console.log('rowData', this.rowData);
  }

  onChangeValue(event) {
    this.change.emit(event);
  }

}
