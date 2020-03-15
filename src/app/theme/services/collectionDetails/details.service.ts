import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { KeycloakService } from '../../../../keycloak/keycloak.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { StorageConfig } from 'app/pages/messageConfiguration/messageConfiguraitonDetails/storageConfig';
// import { ApplicationCardConfig } from
// 'app/pages/messageConfiguration/messageConfiguraitonDetails/applicationManagementList/cardsConfig/applicationCard';

@Injectable()
export class CollectionDetailsService {
	/** Mongo details Url */
	constructor(private http: HttpClient) { }

	/**
   * Returns an Observable for the HTTP POST request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
	// loadDetails(entity: string, url: string): Observable<any> {
	// 	console.log('<<url>>>>>  ', url);
	// 	let headers = new HttpHeaders({
	// 		'Content-Type': 'application/json'
	// 	});

	// 	return this.http.get(url).pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }

	/**
  */
	// saveContract(
	// 	contract: any,
	// 	timeStamp: any,
	// 	contractContext: any,
	// 	contractMetadata: any,
	// 	displayMode: string
	// ): Observable<any> {
	// 	if (displayMode === 'c') {
	// 		contractMetadata = {
	// 			businessActivity: '',
	// 			businessContext: 'policyIdent',
	// 			messageId: 'api_10',
	// 			version: '1.0',
	// 			collectionId: 'policy-ident'
	// 		};
	// 		contractContext = {
	// 			'juridical-entity': contract['juridical-entity'],
	// 			thirdParty: contract['thirdParty'],
	// 			agreement: contract['agreement']
	// 		};
	// 	}
	// 	contractMetadata['timestamp'] = { $date: timeStamp };
	// 	contractMetadata['messageSignature'] = 'policy-ident-' + timeStamp;
	// 	contractMetadata['direction'] = 'api';
	// 	contractMetadata['user'] = KeycloakService.getUsername();

	// 	const request = {
	// 		'policy-ident': {
	// 			context: contractContext,
	// 			data: contract,
	// 			metadata: contractMetadata
	// 		},
	// 		context: contractContext,
	// 		metadata: contractMetadata
	// 	};
	// 	const body = JSON.stringify(request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };

	// 	return this.http
	// 		.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 		.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }

	// saveAgreement(
	// 	agreementDetail: any,
	// 	timeStamp: any,
	// 	agreementContext: any,
	// 	agreementMetadata: any,
	// 	isCreateMode: boolean,
	// 	isVersionMode: boolean
	// ): Observable<any> {
	// 	const refList = [];

	// 	if (isCreateMode) {
	// 		agreementMetadata = {
	// 			collectionId: 'agreement',
	// 			businessActivity: '',
	// 			businessContext: 'agreement',
	// 			messageId: 'api_10',
	// 			version: '2.0'
	// 		};

	// 		agreementContext = {
	// 			'juridical-entity': agreementDetail['juridical-entity'],
	// 			thirdParty: agreementDetail['thirdParty']
	// 		};
	// 	}
	// 	if (isCreateMode || isVersionMode) {
	// 		refList.push({
	// 			path: 'context',
	// 			field: 'agreement',
	// 			ref: 'agreementRef',
	// 			id: 'agreement_id'
	// 		});
	// 	}
	// 	agreementMetadata['refList'] = refList;
	// 	agreementMetadata['timestamp'] = { $date: timeStamp };
	// 	agreementMetadata['messageSignature'] = 'agreement-' + timeStamp;
	// 	agreementMetadata['direction'] = 'api';
	// 	agreementMetadata['user'] = KeycloakService.getUsername();

	// 	if (isVersionMode) {
	// 		const versionsDBRef = {};
	// 		versionsDBRef['agreement_id'] = agreementDetail['BUID'];
	// 		versionsDBRef['agreementRef'] = {};
	// 		versionsDBRef['agreementRef']['collectionName'] = 'agreement';
	// 		versionsDBRef['agreementRef']['id'] = agreementDetail['BUID'];
	// 		agreementContext['previousVersion'] = versionsDBRef;
	// 	}

	// 	const request = {
	// 		agreement: {
	// 			context: agreementContext,
	// 			data: agreementDetail,
	// 			metadata: agreementMetadata
	// 		},
	// 		context: agreementContext,
	// 		metadata: agreementMetadata
	// 	};
	// 	/* Example of request for saving only a part of the document "ALWAYS ADD METADATA in changedValueLst" */
	// 	// const request = {
	// 	//   collectionBuid: "AMAMI|AMAMI-SA|CNV_AXOS|1|agreement",
	// 	//   collectionId: "agreement",
	// 	//   changedValueLst :[{"path":"agreement.data.label", "value":"my test 2"}, {"path":"agreement.metadata", "value":agreementMetadata}]
	// 	// };

	// 	const body = JSON.stringify(request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };
	// 	if (isCreateMode || isVersionMode) {
	// 		return this.http
	// 			.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 			.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// 	} else {
	// 		return this.http
	// 			.post(KeycloakService.auth.apiUrl + '/collections/agreement/update', body, options)
	// 			.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// 	}

	// }

	// saveJuridicalEntity(
	// 	juridicalEntity: any,
	// 	timeStamp: any,
	// 	context: any,
	// 	metadata: any,
	// 	displayMode: string
	// ): Observable<any> {
	// 	const refList = [];
	// 	if (displayMode === 'c') {
	// 		refList.push({
	// 			path: 'context',
	// 			field: 'juridical-entity',
	// 			ref: 'juridical-entityRef',
	// 			id: 'juridical-entity_id'
	// 		});
	// 		if (!juridicalEntity.node) {
	// 			refList.push({
	// 				path: 'data',
	// 				field: 'parentNode',
	// 				id: 'juridical-entity_id',
	// 				ref: 'parentNodeRef'
	// 			});
	// 		}
	// 		metadata = {
	// 			collectionId: 'juridical-entity',
	// 			businessActivity: '',
	// 			businessContext: 'juridicalEntity',
	// 			messageId: 'api_10',
	// 			version: '2.0'
	// 		};
	// 	}
	// 	metadata['refList'] = refList;
	// 	metadata['timestamp'] = { $date: timeStamp };
	// 	metadata['messageSignature'] = 'juridical-entity-' + timeStamp;
	// 	metadata['direction'] = 'api';
	// 	metadata['user'] = KeycloakService.getUsername();
	// 	const request = {
	// 		'juridical-entity': {
	// 			context: context,
	// 			data: juridicalEntity,
	// 			metadata: metadata
	// 		},
	// 		context: context,
	// 		metadata: metadata
	// 	};
	// 	const body = JSON.stringify(request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };
	// 	return this.http
	// 		.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 		.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }

	// saveMessageConfiguration(
	// 	message: any,
	// 	timeStamp: any,
	// 	context: any,
	// 	metadata: any,
	// 	displayMode: string
	// ): Observable<any> {
	// 	const collectionId = StorageConfig.COLLECTION_ID;

	// 	if (displayMode === 'c') {
	// 		metadata = {
	// 			businessActivity: '',
	// 			businessContext: collectionId,
	// 			messageId: 'api_10',
	// 			version: '2.0',
	// 			collectionId: collectionId
	// 		};
	// 		context = {};
	// 	}

	// 	metadata['timestamp'] = { $date: timeStamp };
	// 	metadata['messageSignature'] = `${collectionId}-${timeStamp}`;
	// 	metadata['direction'] = 'api';
	// 	metadata['user'] = KeycloakService.getUsername();

	// 	let request;
	// 	if (displayMode === 'c') {
	// 		request = {
	// 			'message-conf-mapping': {
	// 				data: message,
	// 				context: context,
	// 				metadata: metadata
	// 			},
	// 			context: context,
	// 			metadata: metadata
	// 		};
	// 	} else {
	// 		const updateValues = this.getFieldsToUpdate(collectionId, message, metadata);
	// 		request = {
	// 			collectionBuid: message['BUID'],
	// 			collectionId,
	// 			changedValueLst: updateValues
	// 		};
	// 	}

	// 	const body = JSON.stringify(request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };
	// 	console.log('Headers:', headers);
	// 	console.log('Body:', body);
	// 	return this.http
	// 		.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 		.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }

	// saveMessageApplications(
	// 	application: any,
	// 	timeStamp: any,
	// 	context: any,
	// 	metadata: any,
	// 	displayMode: string
	// ): Observable<any> {
	// 	const collectionId = ApplicationCardConfig.collectionId;
	// 	const messageConfCollectionId = StorageConfig.COLLECTION_ID;

	// 	if (displayMode === 'c') {
	// 		metadata = {
	// 			businessActivity: '',
	// 			businessContext: collectionId,
	// 			messageId: 'api_10',
	// 			version: '2.0',
	// 			collectionId: collectionId
	// 		};
	// 		context = {
	// 			'message-conf-mapping': application['message']
	// 		};
	// 	}

	// 	metadata['timestamp'] = { $date: timeStamp };
	// 	metadata['messageSignature'] = `${collectionId}-${timeStamp}`;
	// 	metadata['direction'] = 'api';
	// 	metadata['user'] = KeycloakService.getUsername();

	// 	let request = {
	// 		'message-applications': {
	// 			data: application,
	// 			context: context,
	// 			metadata: metadata
	// 		},
	// 		context: context,
	// 		metadata: metadata
	// 	};

	// 	const body = JSON.stringify(request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };
	// 	console.log('Headers:', headers);
	// 	console.log('Body:', body);
	// 	return this.http
	// 		.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 		.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }

	private getFieldsToUpdate(collectionId, message, metadata) {
		const fieldsToUpdate = Object.keys(message);
		const updateValues = fieldsToUpdate.map((field) => {
			return {
				path: `${collectionId}.data.${field}`,
				value: message[field]
			};
		});
		const newMetadata = {
			path: `${collectionId}.metadata`,
			value: metadata
		};
		updateValues.push(newMetadata);
		return updateValues;
	}

	// isCollectionExist(collectionId, data, fields): Promise<boolean> {
	// 	const separator = '|';
	// 	const searchedCollection = 'juridical-entity';
	// 	let url =
	// 		KeycloakService.auth.apiUrl +
	// 		'/collections/' +
	// 		searchedCollection +
	// 		'/' +
	// 		data[searchedCollection]['juridical-entity_id'];

	// 	return new Promise<boolean>((resolve, reject) => {
	// 		this.loadDetails(searchedCollection, url).subscribe(
	// 			(collection) => {
	// 				const entity = collection[searchedCollection][0];
	// 				let buid = '';
	// 				buid += entity['context'].tenant.tenant_id + separator + entity['data'].code;
	// 				fields.forEach((field) => (buid += separator + data[field]));
	// 				buid += separator + collectionId;

	// 				url = KeycloakService.auth.apiUrl + '/collections/' + collectionId + '/' + encodeURIComponent(encodeURIComponent(buid));
	// 				this.loadDetails(collectionId, url).subscribe(
	// 					(collection) => {
	// 						if (collection[collectionId].length > 0) {
	// 							resolve(true);
	// 						} else {
	// 							resolve(false);
	// 						}
	// 					},
	// 					(error) => {
	// 						resolve(false);
	// 					}
	// 				);
	// 			},
	// 			(error) => {
	// 				resolve(false);
	// 			}
	// 		);
	// 	});
	// }

	// saveDelegateReport(
	// 	delegateReportEntity: any,
	// 	delegateContext: any,
	// 	delegateMetadata: any,
	// 	timeStamp: string
	// ): Observable<any> {
	// 	const refList = [];

	// 	delegateMetadata = {
	// 		collectionId: 'information-delegate',
	// 		businessActivity: '',
	// 		businessContext: 'agreement',
	// 		messageId: 'api_10',
	// 		version: '2.0'
	// 	};

	// 	delegateContext = {
	// 		'juridical-entity': delegateReportEntity['juridical-entity']
	// 	};

	// 	refList.push({
	// 		path: 'context',
	// 		field: 'information-delegate',
	// 		ref: 'information-delegateRef',
	// 		id: 'information-delegate_id'
	// 	});
	// 	delegateMetadata['refList'] = refList;
	// 	delegateMetadata['timestamp'] = { $date: timeStamp };
	// 	delegateMetadata['messageSignature'] = 'information-delegate-' + timeStamp;
	// 	delegateMetadata['direction'] = 'api';
	// 	delegateMetadata['user'] = KeycloakService.getUsername();

	// 	const request = {
	// 		'information-delegate': {
	// 			context: delegateContext,
	// 			data: delegateReportEntity,
	// 			metadata: delegateMetadata
	// 		},
	// 		context: delegateContext,
	// 		metadata: delegateMetadata
	// 	};

	// 	const body = JSON.stringify(request);
	// 	// console.log('request', request);
	// 	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	// 	const options = { headers: headers };
	// 	return this.http
	// 		.put(KeycloakService.auth.apiUrl + '/collections', body, options)
	// 		.pipe(map((res) => this.extractData(res)), catchError(this.handleError));
	// }
	// /**
	// * Extract data
	// */
	// private extractData(res: any) {
	// 	return res;
	// }

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
