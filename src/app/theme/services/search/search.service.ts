import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Config } from '../../../pages/common/shared/index';

// import { KeycloakService } from '../../../../keycloak/keycloak.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
	url: string = '/collections/search';

	constructor(private http: HttpClient) {}

	/**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
	loadCollections(collections: any, search: string): Observable<any> {
		let body = JSON.stringify({ collections, search });
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

		return this.http
			.post('KeycloakService.auth.apiUrl' + this.url, body, options)
			.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	}

	/**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
	// : Promise<any>
	loadCollectionsPerPage(body: {}): Observable<any> {
		if (!body['multisort']) {
			let multisort = Config.MULTISORT;
			body['multisort'] = multisort;
		}
		let bodyStr = JSON.stringify(body);

		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };

		return this.http
			.post('KeycloakService.auth.apiUrl' + '/collections/search', bodyStr, options)
			.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	}

	// a deplacer dans un service export
	exportDocuments(body: {}, document): Observable<any> {
		if (!body['multisort']) {
			let multisort = Config.MULTISORT;
			body['multisort'] = multisort;
		}
		let bodyStr = JSON.stringify(body);
		// console.log('bodyStr: ', bodyStr)
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers };
		return this.http
			.post('KeycloakService.auth.apiUrl' + '/collections/export/' + document, bodyStr, options)
			.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	}
	// 'KeycloakService.auth.apiUrl' !!

	/**
    * Extract data
    */
	private extractData(res: any): any {
		return res;
	}

	/**
    * Handle HTTP error
    */
	private handleError(error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = error.message
			? error.message
			: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return observableThrowError(errMsg);
	}
}
