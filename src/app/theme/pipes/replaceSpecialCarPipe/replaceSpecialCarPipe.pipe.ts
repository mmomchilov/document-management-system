import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'replaceSpecialCar'})
export class ReplaceSpecialCarPipe implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\\\$/g, '$').replace(/\\:/g, '.');
    return `${newValue}`;
  }
}
