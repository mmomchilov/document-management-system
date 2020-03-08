import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { DateUtils } from '../../../pages/common/components/utils/data-utils';
import { CardListConfiguration } from './cardListConfiguration';
import { CollectionService } from '../cardDetail/collectionService';

@Component({
  selector: 'add-remove-table',
  templateUrl: './addRemoveTable.component.html',
  styleUrls: ['./addRemoveTable.component.scss'],
})
export class AddRemoveTableComponent implements OnInit, OnChanges {
  @Input() database;
  @Input() collectionId;
  @Input() cardsList: CardListConfiguration;
  @Input() items;
  @Input() displayMode;
  @Input() confirmDelete?: Function;

  @Output() changed: EventEmitter<Object> = new EventEmitter<Object>();

  selectedItem: any = null;
  private formGroup: FormGroup;
  private controlRefresh;
  choosenItem;

  constructor(protected translate: TranslateService, private service: CollectionService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.selectedItem = undefined;
      this.choosenItem = undefined;
    }
  }

  selectItem(event) {
    this.selectedItem = event.item;
    this.recursivelyChangeDates(this.selectedItem, DateUtils.extractDateParamsToDatePicker);
    this.controlRefresh = this.updateValuesInElements(this.cardsList[0].elements, this.selectedItem);
  }

  addItem() {
    let newItem = {};
    this.initDateToToday(newItem, this.cardsList[0].elements);
    if (this.cardsList[0].initItem) {
      newItem = this.cardsList[0].initItem(newItem, this.items);
    }
    this.items.push(newItem);
    this.choosenItem = this.items[this.items.length - 1];
  }

  removeItem() {
    if (this.selectedItem) {
      if (this.confirmDelete !== undefined && this.confirmDelete instanceof Function) {
        new Promise((resolve, reject) => {
          this.confirmDelete({
            item: this.selectedItem,
            items: this.items,
            confirm: { 'resolve': resolve, 'reject': reject }
          });
        })
          .then(() => this.deleteSelectedItem())
          .catch(() => { });
      } else {
        this.deleteSelectedItem();
      }
    }
  }

  private deleteSelectedItem() {
    this.removeInArray(this.items, this.selectedItem);
    if (this.items.length > 0) {
      this.choosenItem = this.items[0];
    } else {
      this.selectedItem = null;
    }
  }

  isViewMode(): boolean {
    return this.displayMode === 'r';
  }

  noneSelected(): boolean {
    return this.selectedItem === null;
  }

  refreshElements(event: any) {
    switch (event.element.type) {
      case 'date':
        if (event.event) {
          this.selectedItem[event.element.field] = DateUtils.extractTimestampFromDatePickerValue(event.event);
        } else {
          this.selectedItem[event.element.field] = '';
        }
        break;
      default:
        this.storeData(event.element, event.event);
        break;
    }
    this.changed.emit(event);
  }

  private storeData(label: any, newValue: any): void {
    if (label.storeData) {
      // custom storage function from the configuration
      label.storeData(this.selectedItem, newValue);
    } else {
      this.selectedItem[label.field] = newValue;
    }
  }

  getElements() {
    // flatten array
    return [].concat.apply([], this.cardsList[0].elements).sort((a, b) => a.rank - b.rank);
  }

  recursivelyChangeDates(obj, fct) {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === 'object') {
          this.recursivelyChangeDates(obj[property], fct);
        } else {
          if (property !== '$date' && DateUtils.validateISOdate(obj[property])) {
            obj[property] = fct(obj[property]);
          }
        }
      }
    }
  }

  updateValuesInElements(elements, values) {
    const newElements = [];
    elements.forEach(element => {
      if (Array.isArray(element)) {
        newElements.push.apply(newElements, this.updateValuesInElements(element, values));
      } else {
        const value = this.service.getFieldVal(element.field, element, values);
        if (value) {
          element.value = value;
        } else {
          element.value = undefined;
          element.default = '';
        }
        if (element.optionsPromise) {
          element.optionsPromise(values).then(newOptions => element.options = newOptions);
        }
        newElements.push(element);
      }
    });
    return newElements;
  }

  initDateToToday(item, elements) {
    elements.forEach(element => {
      if (Array.isArray(element)) {
        this.initDateToToday(item, element);
      } else {
        if (element.type === 'date') {
          item[element.field] = DateUtils.extractDateParamsToDatePicker(DateUtils.getCurrentDate());
        }
      }
    });
  }

  removeInArray(array, toRemoved) {
    array.some(function (item, index) {
      if (array[index] === toRemoved) {
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    return array;
  }

}
