// import { throwError as observableThrowError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { catchError, map } from 'rxjs/operators';
// import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { KeycloakService } from '../../../../keycloak/keycloak.service';

// @Injectable()
// export class JsonListService {
// 	url: string = KeycloakService.auth.apiUrl + '/tmp/keycloakuser';

// 	constructor(private http: HttpClient) {}

// 	public load(): any {
// 		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
// 		let options = { headers: headers };

// 		return this.http.get(this.url, options).pipe(
// 			map((response) => {
// 				return response;
// 			}),
// 			catchError(this.handleError)
// 		);
// 	}

// 	public update(jsonUpdate: any) {
// 		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
// 		let options = { headers: headers };
// 		let body = JSON.stringify(jsonUpdate);

// 		return this.http.post(this.url, body, options).pipe(
// 			map((response) => {
// 				return response;
// 			}),
// 			catchError(this.handleError)
// 		);
// 	}

// 	/**
//     * Handle HTTP error
//     */
// 	private handleError(error: any) {
// 		// In a real world app, we might use a remote logging infrastructure
// 		// We'd also dig deeper into the error to get a better message
// 		let errMsg = error.message
// 			? error.message
// 			: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
// 		console.error(errMsg); // log to console instead
// 		return observableThrowError(errMsg);
// 	}
// }
