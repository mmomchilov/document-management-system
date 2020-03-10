import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class TestUtilities {

    static getValueBySelector(fixture: any, selector: string): string {
        const dbgElementBySelector: DebugElement = fixture.debugElement.query(By.css(selector));
        return dbgElementBySelector.properties.value;
    }

    static getTextBySelector(fixture: any, selector: string): string {
        const dbgElementBySelector: DebugElement = fixture.debugElement.query(By.css(selector));
        return dbgElementBySelector.nativeElement.innerText;
    }

    static getHtMLElementBySelector(fixture: any, selector: string): HTMLElement {
        const dbgElementBySelector: DebugElement = fixture.debugElement.query(By.css(selector));
        const element: HTMLElement = dbgElementBySelector.nativeElement as HTMLElement;
        return element;
    }

    static isCheckBoxSelected(fixture: any, selector: string): Boolean {
        const dbgElementBySelector: DebugElement = fixture.debugElement.query(By.css(selector));
        return dbgElementBySelector.nativeElement.checked;
    }
}
