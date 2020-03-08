import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class MyCurrencyPipe implements PipeTransform {

  private DECIMAL_SEPARATOR_IN: string;
  private DECIMAL_SEPARATOR_OUT: string;
  private THOUSANDS_SEPARATOR: string;
  private CURENCY: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR_IN = ".";
    this.DECIMAL_SEPARATOR_OUT = ",";
    this.THOUSANDS_SEPARATOR = " ";
    this.CURENCY = " €";
  }

  transform(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR_IN);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR_OUT + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return integer + fraction+ this.CURENCY;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").split(this.DECIMAL_SEPARATOR_IN);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR_OUT + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}
