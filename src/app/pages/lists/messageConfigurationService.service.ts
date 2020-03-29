import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// import { KeycloakService } from '../../../../keycloak/keycloak.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class MessageConfigurationService {
	getCollections(businessContext): Observable<any> {
		// 	const getUrl = `/collections/businesscontext/${businessContext}`;
		// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// 	const options = { headers: headers };

		// 	return this.http.get(KeycloakService.auth.apiUrl + getUrl, options).pipe(
		// 		map((res) => {
		// 			const collections: any = res;
		// 			collections.sort((a, b) => {
		// 				if (a.depth === b.depth) {
		// 					return a.sequence - b.sequence;
		// 				} else {
		// 					return a.depth - b.depth;
		// 				}
		// 			});
		// 			collections.unshift({
		// 				database: 'message-information',
		// 				collectionId: 'slip-message',
		// 				permission: 'u',
		// 				depth: 0,
		// 				sequence: 1,
		// 				isMandatory: true
		// 			});
		// 			return collections;
		// 		}),
		// 		catchError(this.handleError)
		// 	);
		return null;
	}

	getFields(collectionLst):// Observable<any>
	 {
		return true;
		// const getUrl = `/collections/fields`;
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// const fieldslist = ['mandatory', 'property', 'type', 'embeddedProperty', 'enumRef', 'mappeable', 'orderDisplay'];
		// const body = { inputCollectionsLst: collectionLst, fieldslist: fieldslist };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map((res) => {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
	}

	getOrderingDescription(message): Observable<any> {
		// const getUrl = `/collections/messageconfmapping/orderingdescription`;
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// const body = { message: message };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map((res) => {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
		return null;
	}

	getErrors(message): Observable<any> {
		// const getUrl = `/collections/messageconfmapping/errors`;
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// const body = { message: message };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map((res) => {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
		return null;
	}

	getMessageConfigVersions(query: any): Observable<any> {
		// const body = JSON.stringify(query);
		// const getUrl = '/histojson';
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map(function (res: any) {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
		return null;
	}

	searchModificationHistory(query: any): Observable<any> {
		// const body = JSON.stringify(query);
		// const getUrl = '/histojson';
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map(function (res: any) {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
		return null;
	}

	generateMessageTechnicalFile(messageApplicationBuid: string) {
		// console.log('messageApplicationBuid: ', messageApplicationBuid);
		// const getUrl = '/collections/messageapplication/deploy';
		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		// const options = { headers: headers };
		// const body = { code: messageApplicationBuid };
		// return this.http.post(KeycloakService.auth.apiUrl + getUrl, body, options).pipe(
		// 	map((res) => {
		// 		return res;
		// 	}),
		// 	catchError(this.handleError)
		// );
		return null;
	}

	/**
   * Handle HTTP error
   */
	private handleError(error: any) {
		console.error('handleError');
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		const errMsg = error.message
			? error.message
			: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return observableThrowError(errMsg);
	}

	constructor(private http: HttpClient) { }
}
