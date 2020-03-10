import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'style-loader!./baCollectionDetails.component.scss';
import { ElementConfiguration } from '../cardDetail/configurationClasses/elementConfiguration';
import { OnChangeValueConfiguration } from './onChangeValueConfiguration';
import { CollectionService } from '../cardDetail/collectionService';
@Component({
  selector: 'ba-collection-details',
  templateUrl: './baCollectionDetails.html'
})
export class BaCollectionDetails implements OnInit, DoCheck {

  @Output() changed: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() action: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() cardsList: any[];
  @Input() collection: any;
  @Input() displayMode: string;
  @Input() collectionId: string;
  @Input() database: string;
  @Input()
  get formGroup() {
    return this.formGroupValue;
  }
  @Input() recipientData: any;

  formGroupValue: FormGroup;

  @Output()
  formGroupChange = new EventEmitter<FormGroup>();

  set formGroup(val) {
    this.formGroupValue = val;
    this.formGroupChange.emit(this.formGroupValue);
  }

  constructor(private formBuilder: FormBuilder, private ref: ChangeDetectorRef, private service: CollectionService) {
  }
  display: any = false;
  ngOnInit() {
    const group = {};
    for (const card of this.cardsList) {
      for (const line of card.elements) {
        for (const element of line) {
          this.formGroup.addControl(element.field, new FormControl(
            {
              value: this.calculateElementValue(element),
              disabled: this.disabledDisplay(element.enableDisplay)
            },
            element.validators
          ));
          this.addCallback(element, card.elements);
        }
      }
    }
    this.display = true;
  }

  private addCallback(element: ElementConfiguration, cardElements) {
    const onChange: OnChangeValueConfiguration = element.onChangeValue;
    if (onChange && onChange.options) {
      this.formGroup.get(element.field).valueChanges.subscribe(newVal => {
        const fieldToUpdate = onChange.field;
        cardElements.map(row =>
          row.map(el => {
            if (el.field === fieldToUpdate) {
              this.changeOptions(onChange, el, newVal);
            }
            return el;
          }
          )
        );
        const formControlToUpdate = this.formGroup.get(onChange.field);
        const valueToSet = onChange.value(newVal);
        formControlToUpdate.setValue(valueToSet);
      });
    }
  }

  focusOut(event) {
    const element: ElementConfiguration = event.config;
    const manageFocusOut = element.onFocusOut;
    if (manageFocusOut) {
      const oldVal = event.oldValue;
      const newVal = this.service.getFieldVal(element.field, element, this.collection);
      new Promise((resolve, reject) => {
        manageFocusOut({ oldValue: oldVal, newValue: newVal, confirm: { 'resolve': resolve, 'reject': reject } });
      })
        .then(transformedValue => {
          this.update(element, transformedValue);
        })
        .catch(() => {
          this.update(element, oldVal);
        });
    }
  }

  private update(element, val) {
    const formControlToUpdate = this.formGroup.get(element.field);
    formControlToUpdate.setValue(val);
  }

  private changeOptions(onChange: OnChangeValueConfiguration, el: ElementConfiguration, newVal: string) {
    if (onChange.returnedType === 'promise') {
      onChange.options(newVal).then(newOptions => el.options = newOptions);
    } else {
      el.options = onChange.options(newVal);
    }
  }

  calculateElementValue(element: any) {
    let value = element.default;
    switch (element.type) {
      case 'select':
        if (element.options &&
          this.optionsContainsValue(element.options,
            this.service.getFieldVal(element.field, element, this.collection)
          )) {
          value = this.service.getFieldVal(element.field, element, this.collection);
        } else if (element.options && element.options.length === 1) {
          value = element.options[0].code;
        }
        break;
      default:
        if ((this.collection &&
          this.service.getFieldVal(element.field, element, this.collection)
        )) {
          value = this.service.getFieldVal(element.field, element, this.collection);
        } else if (element.options && element.options.length === 1) {
          value = element.options[0].code;
        }
        break;
    }

    if (value && value !== this.collection[element.field]) {
      this.changed.emit({ 'element': element, 'event': value, 'value': value });
    }

    return value;
  }

  optionsContainsValue(options: any, value: any) {
    const opt = options.find(option => option.code === value);
    if (opt) {
      return true;
    }
    return false;
  }

  ngDoCheck(): void {
    this.ref.detectChanges();
  }

  disabledDisplay(enableDisplayVal: string): boolean {
    if (enableDisplayVal === undefined || enableDisplayVal === null) {
      return false;
    }
    return enableDisplayVal.indexOf(this.displayMode) < 0;
  }


  refreshElements(event: any) {
    this.changed.emit(event);
  }

  selectedElement(event: any) {
    this.selected.emit(event);
  }

  sendAction(event: any) {
    this.action.emit(event);
  }

  controlAddValue: any;
  @Input()
  get controlRefresh() {
    return this.controlAddValue;
  }

  set controlRefresh(elements: any) {
    if (elements) {
      elements.forEach(element => {
        this.formGroup.removeControl(element.field);
        this.formGroup.addControl(element.field,
          new FormControl(
            {
              value: element.value ? element.value : element.default,
              disabled: this.disabledDisplay(element.enableDisplay)
            },
            element.validators
          ));
        this.addCallback(element, [elements]);
      });
    }
    this.controlAddValue = elements;
  }
}
