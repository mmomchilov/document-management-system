import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable ,  of } from 'rxjs';

@Injectable()
export class TranslateLoaderTest implements TranslateLoader {

  translations;

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  getTranslation(lang: string): Observable<any> {
    return of(this.translations);
  }
}
