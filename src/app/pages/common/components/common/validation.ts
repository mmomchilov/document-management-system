import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorFn } from '@angular/forms';

export abstract class ValidationComponent {
  formGroup: FormGroup;
  formErrors = {};
  validationMessages = {};

  constructor(protected translate: TranslateService) {
  }

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.formGroup
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.formErrors = this.buildErrors();
    this.validationMessages = this.buildMessages();
  }

  protected onValueChanged(data?: any) {
    if (!this.formGroup) { return; }

    this.validationMessages = this.buildMessages();
    this.validationCallback();
    const form = this.formGroup;
    for (const field in this.formErrors) {

      // clear previous error message (if any)
      const control = form.controls[field];
      if (control && control.dirty) {
        this.formErrors[field] = '';
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  static config() {
    return {
      maxInteger: 18,
      maxNumber: 19,
      maxRate: 6
    };
  }

  genericErrors() {
    return {
      'required': this.translate.instant('localizationResource.common.validators.required.shortLabel'),
      'number': this.translate.instant('localizationResource.common.validators.number.shortLabel'),
      'integer': this.translate.instant('localizationResource.common.validators.integer.shortLabel'),
      'email': this.translate.instant('localizationResource.common.validators.email.shortLabel'),
      'maxlength': this.translate.instant('localizationResource.common.validators.maxlength.shortLabel'),
      'minlength': this.translate.instant('localizationResource.common.validators.minlength.shortLabel'),
      'rate': this.translate.instant('localizationResource.common.validators.rate.shortLabel'),
      'phone': this.translate.instant('localizationResource.common.validators.phone.shortLabel'),
      'min': this.translate.instant('localizationResource.common.validators.min.shortLabel'),
      'max': this.translate.instant('localizationResource.common.validators.max.shortLabel'),
      'pattern': this.translate.instant('localizationResource.common.validators.pattern.shortLabel'),
      'date': this.translate.instant('localizationResource.common.validators.date.shortLabel'),
      'dateFormat': this.translate.instant('localizationResource.common.dateformat.shortLabel'),
      'noAgreement': this.translate.instant('localizationResource.common.validators.errorNoAgreement.shortLabel')
    };
  }

  buildErrors() {
    let errors = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(name => {
        errors[name] = '';
      });
    }
    return errors;
  }
  buildMessages() {
    let messages = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].validator) {
          let validators = this.formGroup.controls[key].validator(this.formGroup.controls[key]);
          if (validators) {
            let message = {};
            Object.keys(validators).forEach(name => {
              let value = this.genericErrors()[name];
              let field = null;
              switch (name) {
                case 'min':
                case 'max':
                case 'number':
                case 'integer':
                case 'rate':
                case 'amount':
                case '_rate':
                case 'date':
                  field = 'expected';
                  break;
                case 'maxlength':
                case 'minlength':
                  field = 'requiredLength';
                  break;
                case 'pattern':
                  field = 'requiredPattern';
                  break;
              }
              if (field) {
                message[name] = value + ' ' + validators[name][field];
              }
              else {
                message[name] = value;
              }
              message[name] += '.';
            });
            messages[key] = message;
          }
          else {
            messages[key] = {};
          }
        }
      });
    }
    return messages;
  }

  validationCallback() {
    // peut être surchargée dans la classe fille pour faire une action particulière,
    // comme envoyer un évènement
  }
}

export enum DateComparatorEnum { Equal, NotEqual, Greater, Lower, GreaterOrEqual, LowerOrEqual };

export class CustomValidators {
  protected static isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return (value == null) || (typeof value == 'undefined') || (value.length === 0);
  }

  static email(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let EMAIL_REGEXP = /^$|^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

      return EMAIL_REGEXP.test(control.value) ? null : {
        email: {
          valid: false
        }
      };
    } else {
      return null;
    }
  }

  static integer(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let INTEGER_REGEXP = /^[0-9]*$/i;

      return INTEGER_REGEXP.test(control.value) ? null : {
        integer: {
          courante: control.value, expected: '0'
        }
      };
    } else {
      return null;
    }
  }

  static noAgreement(control: AbstractControl): { [key: string]: any } {
    if (control.value === null) {
      return {
        noAgreement: { valid: CustomValidators.noAgreement }
      };
    } else {
      return null;
    }
  }

  static number(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let NUMBER_REGEXP = /^$|^[0-9]+([,][0-9]{1,2})?$/i;

      return NUMBER_REGEXP.test(control.value) ? null : {
        number: {
          courante: control.value, expected: '00,00'
        }
      };
    } else {
      return null;
    }
  }

  static amount(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let NUMBER_REGEXP = /^$|^[0-9]+([.][0-9]{1,2})?$/i;

      return NUMBER_REGEXP.test(control.value) ? null : {
        number: {
          courante: control.value, expected: '00.00'
        }
      }
    } else {
      return null;
    }
  }

  static rate(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let RATE_REGEXP = /^$|^[0-9]{1,3}([,][0-9]{1,2})?$/i;

      return RATE_REGEXP.test(control.value) ? null : {
        rate: {
          courante: control.value, expected: '0,00'
        }
      }
    } else {
      return null;
    }
  }

  static _rate(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let RATE_REGEXP = /^$|^[0-9]{1,3}([.][0-9]{1,2})?$/i;

      return RATE_REGEXP.test(control.value) ? null : {
        rate: {
          courante: control.value, expected: '0.00'
        }
      }
    } else {
      return null;
    }
  }

  static phone(control: AbstractControl): { [key: string]: any } {
    if (control.value) {
      let PHONE_REGEXP = /^$|^(0|\+[0-9]{2})[1-9]([-. ]?[0-9]{2}){4}$/i;

      return PHONE_REGEXP.test(control.value) ? null : {
        phone: {
          valid: false
        }
      }
    } else {
      return null;
    }
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        var num = +control.value;
        if (isNaN(num) || num < min) {
          return {
            min: { courante: control.value, expected: min }
          };
        }
        return null;
      } else {
        return null;
      }
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        var num = +control.value;
        if (isNaN(num) || num > max) {
          return {
            max: { courante: control.value, expected: max }
          };
        }
        return null;
      } else {
        return null;
      }
    };
  }

  static dateComparator(otherControlName: string, format: DateComparatorEnum, shouldUpdateControl = true): ValidatorFn {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function dateComparator(control: FormControl) {
      if (!control.parent) {
        return null;
      }

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('dateComparator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (!thisControl.value || !thisControl.value.date) {
        return null;
      }

      if (!otherControl.value || !otherControl.value.date) {
        return null;
      }

      const updateControl = shouldPropagateChange => {
        if (shouldUpdateControl) {
          thisControl.markAsDirty({ onlySelf: shouldPropagateChange });
        }
      };

      const thisControlDate = thisControl.value.date;
      const thisDate = new Date(thisControlDate.year, thisControlDate.month, thisControlDate.day).getTime();
      const otherControlDate = otherControl.value.date;
      const otherDate = new Date(otherControlDate.year, otherControlDate.month, otherControlDate.day).getTime();

      switch (format) {
        case DateComparatorEnum.NotEqual:
          if (otherDate === thisDate) {
            updateControl(true);
            return {
              date: { expected: '!=' }
            };
          } else {
            updateControl(false);
          }
          break;
        case DateComparatorEnum.Equal:
          if (otherDate !== thisDate) {
            updateControl(true);
            return {
              date: { expected: '==' }
            };
          } else {
            updateControl(false);
          }
          break;
        case DateComparatorEnum.Greater:
          if (otherDate <= thisDate) {
            updateControl(true);
            return {
              date: { expected: '>' }
            };
          } else {
            updateControl(false);
          }
          break;
        case DateComparatorEnum.GreaterOrEqual:
          if (otherDate > thisDate) {
            updateControl(true);
            return {
              date: { expected: '>=' }
            };
          } else {
            updateControl(false);
          }
          break;
        case DateComparatorEnum.Lower:
          if (otherDate >= thisDate) {
            updateControl(true);
            return {
              date: { expected: '<' }
            };
          } else {
            updateControl(false);
          }
          break;
        case DateComparatorEnum.LowerOrEqual:
          if (otherDate > thisDate) {
            updateControl(true);
            return {
              date: { expected: '<=' }
            };
          } else {
            updateControl(false);
          }
          break;
      }

      return null;
    };
  }
  static dateFormatChecker(): ValidatorFn {
    return function dateFormatChecker(control: FormControl) {
      const dateRegEx = new RegExp(/^\d{1,2}\.\d{1,2}\.\d{4}$/);

      if (control.value) {

        return dateRegEx.test(control.value.formatted) ? { dateFormat: { valid: dateFormatChecker } } : null;

      }
      return { dateFormat: { valid: dateFormatChecker } };
    };
  }

}
