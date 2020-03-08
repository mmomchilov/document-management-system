import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// import { KeycloakService } from '../../../../keycloak/keycloak.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateCustomLoader implements TranslateLoader {
	constructor(private http: HttpClient) { }

	/**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
	public getTranslation(lang: string): Observable<any> {
		// let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Content-Language': lang });
		// let options = { headers: headers };
		// return this.http.get(KeycloakService.auth.apiUrl + '/translations', options).pipe(map((res: any) => res));
		return null;
	}
}
