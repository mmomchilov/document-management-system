import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateUtils } from '../../../../pages/common/components/utils/data-utils';
import { ElementConfiguration } from '../../cardDetail/configurationClasses/elementConfiguration';
import { CollectionService } from '../../cardDetail/collectionService';


@Component({
  selector: 'add-remove-list',
  templateUrl: './addRemoveList.component.html',
  styleUrls: ['./addRemoveList.component.scss'],
})
export class AddRemoveListComponent implements OnInit, OnChanges {
  @Input() database: string;
  @Input() collectionId: string;
  @Input() elements: ElementConfiguration[];
  @Input() items;
  @Input()
  set item(element: any) {
    this.showDetail(element);
  }

  @Output() selectItem = new EventEmitter();

  // private selectedItem: any;
  selectedItem: any;

  constructor(protected translate: TranslateService, private service: CollectionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.selectedItem = changes.item.currentValue;
    }
  }

  showDetail(item) {
    if (item) {
      this.selectItem.emit({ item: item });
      this.selectedItem = item;
    }
  }

  formatDate(date: any, format: string): string {
    let value = date;
    if (date && date.date) {
      value = DateUtils.extractTimestampFromDatePickerValue(date);
    }
    return DateUtils.formatDate(value, format);
  }

  getEnumValue(label, item) {
    const value = this.service.getFieldVal(label.field, label, item);
    if (label && label.enumValue && value) {
      return label.enumValue(item);
    }
    if (label && label.optionsName && value) {
      return `localizationEnumValue.${this.database}.${label.optionsName}.${value}.label`;
    }
    let result = '';
    if (label && label.options && value) {
      const option = label.options.find(opt => opt.code === value);
      if (option) {
        result = option.label;
      } else {
        result = value;
      }
    }
    return result;
  }

  getColumns() {
    return this.elements
      .sort((a, b) => a.rank - b.rank)
      .map(this.makeLabel, this);
  }

  makeLabel(label, index, array) {
    return { label: `localizationProperty.${this.database}.${this.collectionId}.${label.label}.shortLabel` };
  }

}
