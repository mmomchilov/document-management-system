import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder, FormControl, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { ValidationComponent, CustomValidators } from '../../../pages/common/components/common/validation';
import { DateUtils } from '../../../pages/common/components/utils/data-utils';
import { CollectionService } from '../cardDetail/collectionService';
import { JsonPath } from './../../services/jsonPath';
import { WidgetConfiguration, DefaultValueRule } from '../cardDetail/configurationClasses/widgetConfiguration';
import { ContainerCommunication } from '../contentContainer/containerCommunication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gen-simple-input',
  templateUrl: './simpleInput.component.html',
  styleUrls: ['./simpleInput.component.scss']
})

export class SimpleInputComponent extends ValidationComponent implements OnInit, OnChanges, OnDestroy {

  @Input() parentId = '';
  @Input() locale = 'fr';
  @Input() displayMode: string;
  @Input() config;
  @Input() database: string;
  @Input() collectionId: string;
  @Input() collection: any;
  @Input() originalCollection: any;
  @Input() updates: ContainerCommunication;
  @Input() formGroup = new FormGroup({});

  @Output() valueChanged = new EventEmitter();

  private temporary;
  private subscription: Subscription;
  private subscriptionTrad: Subscription;

  constructor(protected translate: TranslateService, private fb: FormBuilder,
    private jsonPath: JsonPath, private service: CollectionService) {
    super(translate);
    this.subscriptionTrad = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang) {
        this.locale = event.lang.split('_')[0];
      }
    });
  }

  ngOnInit() {

    if (this.updates) {
      this.subscription = this.updates.updatesForId(this.getId())
        .subscribe(configUpdate => {
          const changeData = configUpdate.changeData;
          if (configUpdate.originalValueHasChanged) {
            this.impactControl(configUpdate.newValue, changeData);
          }
        });
    }

    this.loadControls();
    this.setFormGroup(this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formGroup && this.config) {
      this.loadSimpleControl();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionTrad) {
      this.subscriptionTrad.unsubscribe();
    }
  }

  // HTML functions: start
  isViewMode(): boolean {
    return this.displayMode === 'r';
  }

  isVisible(config: any): boolean {
    if (config.hidden) {
      return !config.hidden(this.collection);
    }
    return true;
  }

  getId(): string {
    // const res = `${this.parentId}-${this.config.field}`;
    return this.config.field;
  }

  getCustomCSS(config) {
    return config.customCSS ? config.customCSS(this.collection) : {};
  }

  getButtonClass() {
    return this.config.classCSS ? this.config.classCSS : '';
  }

  clickButton() {
    if (this.config && this.config.onClick) {
      this.config.onClick({
        id: this.getId(),
        config: this.config,
        collection: this.collection
      });
    }
  }

  isChecked(config: any, option: string): boolean {
    const field = config.field;
    const fieldVal = this.collection[field];
    let isCheckedValue: boolean = false;
    /** Custon isChecked function */
    if (config.isChecked) {
      isCheckedValue = config.isChecked(
        { 'option': option, optionLst: this.config.optionLst, collection: this.collection });
    } else { /** Default behavior */
      // Checkbox
      if (fieldVal && config.type === 'checkbox') {
        const filterByOption = fieldVal.filter(optnObj => optnObj[config.fieldCode] === option);
        isCheckedValue = (filterByOption.length > 0);
      }
      // Radio button
      if (fieldVal && config.type === 'radioButton') {
        isCheckedValue = (fieldVal === option);
      }
    }
    return isCheckedValue;
  }


  focus(config, event) {
    const value = this.getFieldVal(config.field, config);
    this.temporary = value;
  }

  focusOut(config: WidgetConfiguration, event) {
    const value = this.getFieldVal(config.field, config);
    const oldVal = this.temporary;
    this.temporary = undefined;
    const manageFocusOut = config.onFocusOut;
    if (manageFocusOut) {
      new Promise((resolve, reject) => {
        manageFocusOut({ oldValue: oldVal, newValue: value, confirm: { 'resolve': resolve, 'reject': reject } });
      })
        .then(transformedValue => {
          this.update(config, transformedValue);
        })
        .catch(() => {
          this.update(config, oldVal);
        });
    } else {
      this.update(config, value);
    }
  }

  private update(config, valueToStore) {
    this.storeData(config, valueToStore);
    this.updateControlValue(config, valueToStore);
    this.valueChanged.emit({ collection: this.collection });
  }

  onChangeValue(config: any, event: any) {
    console.log('event', event); 
    const newValue = this.getNewValue(event, config);
    this.storeData(config, newValue);
    this.updateControlValue(config, newValue);
    this.emitChange(newValue);
  }

  onDateChanged(newDate, config: any) {
    let newDateValue;
    if (typeof newDate === 'string') {
      newDateValue = newDate;
    } else {
      newDateValue = DateUtils.extractTimestampFromDatePickerValue(newDate);
    }
    this.storeData(config, newDateValue);
    this.updateControlValue(config, newDateValue);
  }

  reloadCache() {
    if (this.config.onChangeValue) {
      this.onChangeValue(this.config, undefined);
    }
    if (this.config.reload) {
      this.config.reload();
    }
  }
  // HTML functions:end

  private getNewValue(event: any, line: any): any {
    let result = event;
    if (line.type === 'radioButton') {
      result = event.code;
    } else {
      if (event && event.target) {
        result = event.target.value;
        if (line.type === 'checkbox') {
          result = {
            code: result,
            checked: event.target.checked
          };
        }
      }
    }
    if (line.inputs) {
      result = {};
      const controls = this.formGroup.controls;
      for (const controlName of line.inputs) {
        result[controlName] = controls[controlName].value;
        this.formGroup.updateValueAndValidity();
      }
    }
    console.log('result', result);
    return result;
  }

  private impactControl(newValue, changeData) {
    const fieldValue = changeData.fieldVal;
    // Change value
    if (fieldValue && this.displayMode !== 'r') {
      // add needed data in second parameter for configuration(if need) - " onChangeValue: [{ fieldVal: ((newVal, obj)"
      // i.e.: what is in { 'collection': this.collection, ...} goes in obj of fieldVal: ((newVal, obj) in onChangeValue
      const propagatedVal = fieldValue(newValue, { 'collection': this.collection });
      this.changeFieldValue(propagatedVal);
    }
    // Change if it should be disabled or not
    if (changeData.disabled) {
      const disabled = changeData.disabled(newValue);
      this.disableField(disabled);
    }
    // Change options list (applicable for select)
    if (changeData.options) {
      if (changeData.returnedType === 'promise') {
        this.config.loading = true;
        changeData.options(newValue)
          .then(newOptions => {
            this.config.optionLst = newOptions;
            this.config.loading = false;
          });
      } else {
        const newOptions = changeData.options(newValue);
        this.config.optionLst = newOptions;
      }
    }

    if (this.config.enumTransformation) {
      this.addOptions(this.config, newValue);
    }

    if (changeData.labelCode) {
      this.config.labelCode = changeData.labelCode(newValue, { 'collection': this.collection });
      this.config.label = undefined;
      this.applyDefaultLabel(newValue, this.config);
    }

    if (changeData.validators) {
      const newValidators = changeData.validators(newValue);
      this.config.validators = newValidators;
      const listValidators = this.listFieldValidations({ validators: newValidators });
      this.formGroup.controls[this.config.field].setValidators(listValidators);
      this.formGroup.controls[this.config.field].updateValueAndValidity();
      this.formGroup.updateValueAndValidity();
    }
  }

  private valueHasChanged(config, newValue: any): boolean {
    // return newValue !== this.service.getFieldVal(config.field, config, this.originalCollection);
    return true;
  }

  private changeFieldValue(propagatedVal) {
    if (this.config.type === 'date') {
      this.onDateChanged(propagatedVal, this.config);
    } else {
      this.onChangeValue(this.config, propagatedVal);
    }
  }

  private disableField(disabled) {
    const fieldId = this.config.field;
    if (disabled) {
      this.formGroup.get(fieldId).disable();
    } else {
      this.formGroup.get(fieldId).enable();
    }
  }

  private storeData(config: any, newValue: any): void {
    // console.log('this.config.field', this.config.field); 
    if (config.storeData) {
      // custom storage function from the configuration
      config.storeData(this.collection, newValue);
    } else {
      this.storeDataDefault(config, newValue);
    }
  }

  private updateControlValue(config: any, newValue: any): void {
    if (!['checkbox', 'radioButton'].includes(config.type)) {
      let controlValue = newValue;
      if (config.type === 'date') {
        controlValue = DateUtils.extractDateParamsToDatePicker(newValue);
      }
      this.formGroup.controls[config.field].setValue(controlValue);
      this.formGroup.updateValueAndValidity();
      console.log('controlValue', controlValue); 
      console.log('this.config.field', this.config.field); 
      console.log('formGroup config simple', this.formGroup);
    }
  }

  private storeDataDefault(config: any, newValue: any): void {
    if (config.type === 'checkbox') {
      console.log('config.type simple', config.type);
      const fieldCode = config.fieldCode;
      let fieldVal: any[] = this.collection[config.field];
      if (!fieldVal) {
        this.collection[config.field] = [];
        fieldVal = this.collection[config.field];
      }
      if (newValue.checked) {
        const obj = {};
        obj[fieldCode] = newValue.code;
        fieldVal.push(obj);
      } else {
        const index = fieldVal.findIndex(obj => obj[fieldCode] === newValue.code);
        if (index >= 0) {
          fieldVal.splice(index, 1);
        }
      }
    } else {
       this.service.initializeValue(this.collection, config, newValue);
    }
  }

  private getFieldVal(field: string, line: any): any {
    let fieldVal = this.service.getFieldVal(field, line, this.collection);

    if (line.type === 'date') {
      if (!this.isViewMode()) {
        fieldVal = DateUtils.extractDateParamsToDatePicker(fieldVal);
      } else {
        fieldVal = DateUtils.formatDate(fieldVal, 'dd/MM/yyyy');
      }
    }

    let fieldValue = fieldVal;
    const defaultValueRule = line.defaultValueRule;
    if (!fieldVal && defaultValueRule) {
      switch (defaultValueRule) {
        case DefaultValueRule.SINGLE_ITEM_LIST:
          if (line.optionLst && line.optionLst.length === 1) {
            const defaultValue = line.optionLst[0].code;
            fieldValue = defaultValue;
            this.service.initializeValue(this.collection, line, defaultValue);
            this.emitChange(defaultValue);
          }
          break;
        case DefaultValueRule.FIRST_ITEM:
          if (line.optionLst && line.optionLst.length > 0) {
            const defaultValue = line.optionLst[0].code;
            fieldValue = defaultValue;
            this.service.initializeValue(this.collection, line, defaultValue);
            this.emitChange(defaultValue);
          }
          break;
      }
    } else {
      if (line.refresh) {
        this.emitChange(fieldVal);
      }
    }

    return fieldValue;
  }

  private emitChange(newValue) {
    this.valueChanged.emit({
      id: this.getId(),
      onChangeValue: this.config.onChangeValue,
      config: this.config,
      'newValue': newValue,
      originalValueHasChanged: this.valueHasChanged(this.config, newValue),
      collection: this.collection
    });
  }

  private loadControls() {
    if (this.config) {
      this.loadSimpleControl();
    }
  }

  private loadSimpleControl(): void {

    const field = this.config.field;
    this.applyDefaultLabel(field, this.config);
    this.addOptions(this.config, undefined);

    const newControl = new FormControl(
      {
        value: this.getFieldVal(field, this.config),
        disabled: this.isDisplayDisabled(this.config)
      },
      this.listFieldValidations(this.config)
    );
    this.formGroup.setControl(field, newControl);
    this.formGroup.updateValueAndValidity();
  }

  private applyDefaultLabel(field: string, line: any): void {
    if (!line.label || typeof line.labelCode === 'function') {
      let labelPath = '';
      if (line.labelPath) {
        labelPath = `${line.labelPath}.`;
      }
      let labelCode = field;
      if (line.labelCode) {
        if (typeof line.labelCode === 'function') {
          labelCode = line.labelCode(this.collection);
        } else {
          labelCode = line.labelCode;
        }
      }

      line.label = `localizationProperty.${this.database}.${this.collectionId}.${labelPath}${labelCode}.shortLabel`;
    }

  }

  private addOptions(line: any, newValue): void {
    if (line.options && typeof line.options === 'function') {
      line.optionLst = line.options(this.collection);
    }

    if (line.optionsPromise) {
      line.loading = true;
      line.optionsPromise(this.collection).then(newOptions => {
        line.optionLst = newOptions;
        line.loading = false;
      });
    }

    const enumCode = line.enum;
    if (enumCode) {
      this.buildEnumerationList(enumCode, line, newValue);
    }
  }

  private buildEnumerationList(enumCode: string, line: any, newVal) {
    const enumTranslationProperty = `localizationEnumValue.${this.database}.${enumCode}`;
    this.translate.stream(enumTranslationProperty)
      .subscribe(res => {
        let enumerationLst = Object.keys(res)
          .map(key => (
            {
              code: key,
              display: res[key]['label']
            })
          );
        if (line.enumTransformation) {
          enumerationLst = line.enumTransformation(
            { enumCodeLst: enumerationLst, newValue: newVal, collection: this.collection });
        }
        console.log('enumerationLst', enumerationLst); 
        line.optionLst = enumerationLst;
      });
  }

  private getEnumTranslationCode(enumName: string, code: string): string {
    return `localizationEnumValue.${this.database}.${enumName}.${code}.label`;
  }

  isDisplayDisabled(config: any): boolean {
    if (this.isViewMode()) {
      return true;
    }
    if (!config.disabledDisplayModes) {
      return false;
    }
    if (config.disabled) {
      return config.disabled(this.collection);
    }
    return config.disabledDisplayModes.indexOf(this.displayMode) >= 0;
  }

  private listFieldValidations(line: any): ValidatorFn[] {
    if (line.validators) {
      return new Array(
        line.validators.isRequired ? Validators.required : Validators.nullValidator,
        this.dateFormatValidation(line),
        this.dateValidation(line.validators.date),
        line.validators.number ? CustomValidators.number : Validators.nullValidator,
        line.validators.integer ? CustomValidators.number : Validators.nullValidator,
        line.validators.amount ? CustomValidators.amount : Validators.nullValidator,
        line.validators.minLength && line.validators.minLength > 0
          ? Validators.minLength(line.validators.minLength) : Validators.nullValidator,
        line.validators.maxLength && line.validators.maxLength > 0
          ? Validators.maxLength(line.validators.maxLength) : Validators.nullValidator,
      );
    } else {
      return undefined;
    }
  }
  private dateFormatValidation(line: any): ValidatorFn {

    if (line.type === 'date') {
      return CustomValidators.dateFormatChecker();
    } else {
      return Validators.nullValidator;
    }
  }

  private dateValidation(dateValidator: any): ValidatorFn {
    if (dateValidator && dateValidator.otherDate && dateValidator.dateComparator) {
      return CustomValidators.dateComparator(dateValidator.otherDate, dateValidator.dateComparator);
    } else {
      return Validators.nullValidator;
    }
  }
}
