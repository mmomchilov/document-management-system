
import { DatePipe } from '@angular/common';
// import {timezoneGMT} from '../../../../../environments/environment';
export class DateUtils {

  static DATE_MAX: string = DateUtils.ddmmyyyyToTimestamp('31-12-2999');

  public static convertDate2Timestamp(date: Date): string {
    let timestamp = DateUtils.pad(date.getFullYear(), 4) + '-' + (DateUtils.pad(date.getMonth() + 1)) + '-' + DateUtils.pad(date.getDate());
    return timestamp;
  }

  public static getCurrentDate(): string {
    let now = new Date();
    console.log('++++++++++++++++++++++ getCurrentDate');
   // console.log(new DatePipe('fr-FR'));
    let today = DateUtils.pad(now.getFullYear(), 4) + '-' + (DateUtils.pad(now.getMonth() + 1)) + '-' + DateUtils.pad(now.getDate());
    return today;
  }

  public static pad(num: number, size: number = 2) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }


  public static extractStringDate(dateVal: any): string {
    if (dateVal == 'undefined' || dateVal == null || dateVal == '') {
      return '';
    } else if (typeof dateVal === 'string') {
      return dateVal;
    } else if (dateVal['$date']) {
      return dateVal['$date'];
    }
    return '';
  }

  public static extractMongoDate(dateVal: any): any {
    if (dateVal == 'undefined' || dateVal == null || dateVal == '') {
      return { '$date': '' };
    }
    if (typeof dateVal === 'string') {
      return { '$date': dateVal };
    } else if (dateVal['$date']) {
      return dateVal;
    }
    return { '$date': '' };
  }

  public static formatDate(timestamp: any, format: string): string {
    let datePipe = new DatePipe('fr-FR');
    let stringTimestamp = DateUtils.extractStringDate(timestamp);
    return datePipe.transform(stringTimestamp, format, 'UTC/GMT');
  }

  public static ddmmyyyyToTimestamp(formatted: string): string {
    let modelVal = formatted.substring(6, 10) + '-'
      + formatted.substring(3, 5) + '-'
      + formatted.substring(0, 2);
    return modelVal + 'T00:00:00.000Z';
  }

  public static extractDateParamsToDatePicker(modelValue: any): any {
    let newDateViewModel = { date: {} };
    let dateModel = modelValue;
    if (dateModel && dateModel != null && typeof dateModel === 'string') {
      let year = +dateModel.substring(0, 4);
      let month = +dateModel.substring(5, 7);
      let day = +dateModel.substring(8, 10);
      newDateViewModel.date['year'] = year;
      newDateViewModel.date['month'] = month;
      newDateViewModel.date['day'] = day;
    } else if (dateModel != null && typeof dateModel === 'object' && dateModel['$date']) { // comonent dynamic
      let year = +dateModel['$date'].substring(0, 4);
      let month = +dateModel['$date'].substring(5, 7);
      let day = +dateModel['$date'].substring(8, 10);
      newDateViewModel.date['year'] = year;
      newDateViewModel.date['month'] = month;
      newDateViewModel.date['day'] = day;
    } else {
      newDateViewModel = undefined;
    }
    return newDateViewModel;
  }

  public static extractTimestampFromDatePickerValue(datePickerValue: any): any {
    if (datePickerValue && datePickerValue.date) {
      let _date = datePickerValue.date;
      let _month = _date.month < 10 ? '0' + _date.month : _date.month;
      let _day = _date.day < 10 ? '0' + _date.day : _date.day;
      return _date.year + "-" + _month + "-" + _day + 'T00:00:00.000Z';
    }
    return null;
  }

  public static getTime(date: any): number {
    return new Date(date.year, date.month - 1, date.day).getTime();
  }

  public static getCurrentMongoDate(): any {
    let d = new Date();
    let timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)
      + 'T'
      + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2)
      + '.000Z';
    return timestamp;
    // return this.extractMongoDate(timestamp);
  }

  public static validateISOdate(date: string): boolean {
    let ISODATE_REGEXP = /^(\d{4})-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

    return ISODATE_REGEXP.test(date);
  }

  static prepareCollectionDatesForMongo(collection: any) {
    this.recursivelyChangeDates(collection, this.extractMongoDate);
  }

  private static recursivelyChangeDates(obj, fct) {
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
  static toUserTimestamp(timestamp, lang) {
    const locale = this.toLocale(lang);
    const datePipe = new DatePipe(locale);
    return datePipe.transform(timestamp, this.tolocaleFormat(lang));
  }

  static toLocale(lang: string) {
    switch (lang) {
      case 'en_EN':
      case 'en-EN':
        return 'en-EN';
      default: return 'fr-FR';
    }
  }
  static tolocaleFormat(lang: string) {
    switch (lang) {
      case 'en_EN':
      case 'en-EN':
        return 'MM/dd/yyyy HH:mm';
      default: return 'dd/MM/yyyy HH:mm'; // french format
    }
  }
}
