import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IMyDpOptions } from 'mydatepicker';
import { ValidationComponent } from '../../../../pages/common/components/common/validation';
import { Validators, NgForm, FormGroup } from '@angular/forms';
import 'style-loader!./baCardDetails.component.scss';
import { ElementConfiguration } from '../../cardDetail/configurationClasses/elementConfiguration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ba-card-details',
  templateUrl: './baCardDetails.html'
})
export class BaCardDetails extends ValidationComponent implements OnInit, OnDestroy {

  @Input() card: ElementConfiguration[][];
  @Input() collection: any;
  @Input() title: string;
  @Input() type: string;
  @Input() collectionId: string;
  @Input() database: string;
  @Input() enableDisplay: string = 'crud';
  @Input() result: any = {};
  @Input() resultDate: any = {};
  @Input() displayMode: string;
  @Input() dateViewModel = { date: null };
  @Input() myDatePickerOptions: IMyDpOptions = { dateFormat: 'dd/mm/yyyy' };
  @Input() locale = 'fr';
  @Input() subFormData: NgForm;
  @Input() controlRefresh: any;
  @Input()
  get isOpenedHeader() {
    return this.isOpenedHeaderValue;
  }
  @Input()
  get formGroup() {
    return this.formGroupValue;
  }
  set formGroup(val) {
    this.formGroupValue = val;
    this.formGroupChange.emit(this.formGroupValue);
  }

  datePlaceHolder: string = 'localizationResource.common.dateformat.shortLabel';
  submitted = false;
  createComponent: boolean = false;
  _required = Validators.required;
  isOpenedHeaderValue: boolean;
  formGroupValue: FormGroup;
  temporary;
	private subscription: Subscription;

  @Output() isOpenedHeaderChange = new EventEmitter<boolean>();
  @Output() action: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() formGroupChange = new EventEmitter<FormGroup>();
  @Output() updatedElement: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() selectedElement: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onFocusOut = new EventEmitter();

  constructor(protected translate: TranslateService) {
    super(translate);
    this.subscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang) {
        this.locale = event.lang.split('_')[0];
      }
    });
  }

  ngOnInit() {
    for (const elements of this.card) {
      for (const element of elements) {
        this.initOptions(element);
        element.value = (this.collection && this.collection[element.field])
          ? this.collection[element.field]
          : element.default;
        this.formErrors[element.field] = '';
      }
    }
    this.setFormGroup(this.formGroupValue);
  }

  ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

  initOptions(element: ElementConfiguration) {
    if (element.optionsPromise) {
      element.optionsPromise(this.collection).then(newOptions => element.options = newOptions);
    }
    if (!element.options && element.optionsName) {
      element.options = this.getOptionsByEnumRef(element.optionsName);
    }
  }
  set isOpenedHeader(val) {
    this.isOpenedHeaderValue = val;
    this.isOpenedHeaderChange.emit(this.isOpenedHeaderValue);
    this.sendAction({ action: 'header', state: val });
  }

  refreshElements(event: any) {
    this.updatedElement.emit(event);
  }

  sendAction(event: any) {
    this.action.emit(event);
  }

  showHideDetails() {
    this.isOpenedHeader = !this.isOpenedHeader;
  }

  onChangeValue(element: any, event: any, optionCode: any) {
    this.updatedElement.emit({ 'element': element, 'event': event, 'value': optionCode });
  }

  selectElement(element: any, event: any, index: number) {
    this.selectedElement.emit({ 'element': element, 'event': event, 'index': index });
  }

  // 3 a revoir si on peut rendre ça plus rapide
  isChecked(field: any, fieldObject: any, elementToCompare: any) {
    const listElements: any[] = this.result[field];
    if (listElements !== undefined && listElements) {
      const result = listElements.find(element => element[fieldObject] === elementToCompare);
      return result !== undefined && result !== null;
    }
    return false;
  }

  disabledDisplay(enableDisplayVal: string): boolean {
    if (enableDisplayVal === undefined || enableDisplayVal === null) {
      return false;
    }
    return enableDisplayVal.indexOf(this.displayMode) < 0;
  }

  isHidden(element) {
    if (element.hidden) {
      return element.hidden(this.collection);
    }
    return false;
  }

  isViewMode(): boolean {
    return this.displayMode === 'r';
  }

  focus(config, event) {
    this.temporary = event.srcElement.value;
  }

  focusOut(config, event) {
    this.onFocusOut.emit({ 'config': config, oldValue: this.temporary });
  }

  private getOptionsByEnumRef(enumRef: string) {
    let result = [];
    let localizationEnumValue;
    if (this.translate && this.translate.currentLang && this.translate.translations[this.translate.currentLang]) {
      localizationEnumValue = this.translate.translations[this.translate.currentLang].
        localizationEnumValue[this.database];
    }

    if (localizationEnumValue) {
      const defaultOptions = localizationEnumValue[enumRef] ? Object.keys(localizationEnumValue[enumRef]) : [];
      result = defaultOptions.map(option => Object.create({
        code: option,
        label: `localizationEnumValue.${this.database}.${enumRef}.${option}.label`
      }));
    }
    return result;
  }
}
