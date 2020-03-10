import { Component, Input, ViewChild } from '@angular/core';
import { Routes } from '@angular/router';

// import { BaMenuService, SearchService, RoutingService, CollectionDetailsService } from '../theme';
// import { GlobalState } from '../global.state';
// import { AppState } from '../app.service';
import { SearchComponent } from './search';
import { PAGES_MENU } from './pages.menu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';
import { DetailsModal } from './search/modals/details/details.modal.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'style-loader!./pages.scss';
import { CustomServerDataSource } from './search/custom.data-source';

@Component({
	selector: 'pages',
	templateUrl: './pages.html',
	providers: [CustomServerDataSource]
})
export class Pages {
	public items: any = {};
	public settings: any = {};
	public limitedSettings: any = {};
	public keyword: any;
	public selectedItem: any;
	public isSelectedItem: boolean = false;
	public selectedItemList: any[];
	public errorMessage: string;
	public allItems: any;
	public modalItems: any;
	public collections = [];
	public isCollectionReady: boolean = false;
	public constantLimitedTableSize = 4;
	public currentInfoChild;
	juridicalCache: any = {};
	agreementCache: any = {};
	subscribed = {};

	@Input() detailsBlockedAmountTableData: Array<any>;

	constructor(
		private http: HttpClient,
		// private _modalService: BsModalService,
		// private _menuService: BaMenuService,
		private router: Router,
		// private _state: GlobalState,
		private translate: TranslateService,
		// private routingService: RoutingService,
		// private searchService: SearchService,
		// private collectionDetails: CollectionDetailsService,
		private searchComponent: SearchComponent,
		// private _appState: AppState
	) {
		// Juridical cache
		// for (let juridical of this._appState.get('config.juridicals')) {
		// 	this.juridicalCache['' + juridical.BUID] = juridical.legalName;
		// }
		// var juConfig = (config) => {
		// 	for (let juridical of config) {
		// 		this.juridicalCache['' + juridical.BUID] = juridical.legalName;
		// 	}
		// };
		// this._state.subscribe('config.juridicals', 'pagesJUConfig', juConfig);
		// this.subscribed['config.juridicals'] = 'pagesJUConfig';

		// Agreement Cache
		// for (let agreement of this._appState.get('config.delegationList')) {
		// 	this.agreementCache['' + agreement.agreementId] = agreement.agreementCode;
		// }
		// var delegationList = (config) => {
		// 	for (let agreement of config) {
		// 		this.agreementCache['' + agreement.agreementId] = agreement.agreementCode;
		// 	}
		// };
		// this._state.subscribe('config.delegationList', 'pagesDelegationLst', delegationList);
		// this.subscribed['config.delegationList'] = 'pagesDelegationLst';

		// var searchCollection = (conf) => {
		// 	this.items.id = 'searchCollection';
		// 	this.items.title = 'Collection';
		// 	this.items.hideLabel = true;
		// 	this.items.hideAll = false;
		// 	let options: any = [];
		// 	for (let index = 0; index < conf.all.length; index++) {
		// 		let option: any = {};
		// 		option.label = 'localizationResource.common.' + conf.all[index] + '.shortLabel';
		// 		option.value = conf.all[index];
		// 		options.push(option);
		// 	}
		// 	this.items.options = options;
		// };
		// this._state.subscribe('config.searchableCollections', 'pagesSearchCollection', searchCollection);
		// this.subscribed['config.searchableCollections'] = 'pagesSearchCollection';

		var displayCol = (conf) => {
			Object.keys(conf).forEach((collectionName) => {
				let columns: any = {};
				if (conf[collectionName]) {
					let confOption = conf[collectionName].sort((columnA, columnB): number => {
						if (columnA.order < columnB.order) return -1;
						if (columnA.order > columnB.order) return 1;
						return 0;
					});
					// complete settings
					let setting: any = {};
					setting.actions = { add: false, edit: false, delete: false };
					setting.hideSubHeader = true;
					setting.pager = { perPage: 7 };
					setting.columns = this.getCollectionColumns(
						collectionName,
						confOption,
						-1,
						this.juridicalCache,
						this.agreementCache
					);
					this.settings[collectionName] = setting;
					// limited settings 4 columns for general search
					let limitedSetting: any = {};
					limitedSetting.actions = { add: false, edit: false, delete: false };
					limitedSetting.hideSubHeader = true;
					limitedSetting.pager = { perPage: 7 };
					limitedSetting.columns = this.getCollectionColumns(
						collectionName,
						confOption,
						this.constantLimitedTableSize,
						this.juridicalCache,
						this.agreementCache
					);
					this.limitedSettings[collectionName] = limitedSetting;
				}
			});
		};
		// this._state.subscribe('config.displayableColumns', 'pagesDisplayCol', displayCol);
		// this.subscribed['config.displayableColumns'] = 'pagesDisplayCol';
	}

	getSettings(collection: any) {
		if (this.settings[collection]) {
			for (let key in this.settings[collection].columns) {
				let title = this.translate.instant(this.settings[collection].columns[key].titleCode);
				this.settings[collection].columns[key].title = title;
			}
		}
		return this.settings[collection];
	}

	getCollectionColumns(
		collectionId: string,
		collectionColumnArray: any,
		limit: number,
		juridicalCache: any,
		agreementCache: any
	) {
		let columns: any = {};
		let translation = this.translate;
		if (limit < 0) {
			limit = collectionColumnArray.length;
		}
		let columnNumber = 0;
		for (let index = 0; index < collectionColumnArray.length; index++) {
			if (columnNumber < limit) {
				let name = collectionColumnArray[index].name;
				if (collectionColumnArray[index].embedded) {
					name = collectionColumnArray[index].embedded + '.' + name;
				}
				let titleCode = 'localizationProperty.index.index_' + collectionId + '.' + name + '.shortLabel';
				let column: any = {};
				column.titleCode = titleCode;
				column.title = this.translate.instant(
					'localizationProperty.index.index_' + collectionId + '.' + name + '.shortLabel'
				);
				column.order = collectionColumnArray[index].order;
				// if ref
				if (collectionColumnArray[index].ref) {
					column.valuePrepareFunction = function (value) {
						let returnVal = value;
						if (value && collectionColumnArray[index].ref === 'juridical-entity') {
							returnVal = juridicalCache[value];
						} else if (value && collectionColumnArray[index].ref === 'agreement') {
							returnVal = agreementCache[value];
						}
						return returnVal;
					};
				} else if (collectionColumnArray[index].embedded) {
					// if embedded
					let embedded = collectionColumnArray[index].embedded;
					let property = collectionColumnArray[index].name;
					column.valuePrepareFunction = function (value, row) {
						let returnVal;
						if (row[embedded]) {
							if (row[embedded][property]) {
								returnVal = row[embedded][property];
							} else if (row[embedded][0]) {
								returnVal = row[embedded][0][property];
							}
							// if embedded && enumeration
							if (returnVal && collectionColumnArray[index].enumRef) {
								let enumRef = collectionColumnArray[index].enumRef;
								returnVal = translation.instant(
									'localizationEnumValue.portfolio.' + enumRef + '.' + returnVal + '.label'
								);
							}
						}
						return returnVal;
					};
				} else if (collectionColumnArray[index].enumRef) {
					// if enumeration
					const enumRef = collectionColumnArray[index].enumRef;
					let rr = 'localizationEnumValue.portfolio.';
					if (enumRef === 'agreemntst') { rr = 'localizationEnumValue.index.'; }
					column.valuePrepareFunction = function (value) {
						let returnVal = value;
						if (value) {
							returnVal = translation.instant(
								rr + enumRef + '.' + value + '.label'
							);
						}
						return returnVal;
					};
				}
				columns[collectionColumnArray[index].name] = column;
			}
			columnNumber++;
		}
		return columns;
	}

	ngOnInit() {
		// this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
		this.selectedItem = 'all';
	}

	ngOnDestroy() {
		// Object.keys(this.subscribed).forEach(eventId => {
		// 	this._state.unsubscribe(eventId, this.subscribed[eventId]);
		// });
	}

	sortByOrder(columnA: any, columnB: any) {
		return columnA.order > columnB.order;
	}

	showSearchResultModal(keyword: any): void {
		this.keyword = keyword;

		if (this.selectedItem !== 'all' && this.isSelectedItem) {
			this.currentInfoChild = keyword;
			let customCollectionDataSource = new CustomServerDataSource(this.http);
			customCollectionDataSource.setCollectionId(this.selectedItemList[0]);
			customCollectionDataSource.setConfig(this._appState.get('config.displayableColumns'));
			customCollectionDataSource.setSearch(this.keyword);
			const modalOptions: ModalOptions = {
				backdrop: 'static',
				class: 'large-modal',
				initialState: {
					detailsTitle: this.translate.get(`localizationResource.common.${this.selectedItem}.longLabel`),
					selectedItemList: this.selectedItemList,
					selectedItem: this.selectedItem,
					settings: this.settings,
					dataSourceList: this.modalItems,
					collection: this.selectedItem,
					keyword: this.keyword,
					'customCollectionDataSource': customCollectionDataSource,
					isCollectionReady: true
				}
			};
			this._modalService.show(DetailsModal, modalOptions);
		}
	}

	searchAll(keyword: any) {
		this.isCollectionReady = false;
		this.keyword = keyword;
		this.routingService.data.keyword = this.keyword;
		if (!this.isSelectedItem || this.selectedItem === 'all') {
			this.getSelectedItemList();
			this.routingService.data.selectedItem = 'All';
			this.routingService.data.isSearchAll = true;
			this.getAllItems(this.selectedItemList, this.keyword);
		}
	}

	select(selectedItem: any) {
		this.isCollectionReady = false;
		this.isSelectedItem = true;
		this.selectedItem = selectedItem;
		this.selectedItemList = [this.selectedItem];
		this.routingService.data.selectedItem = this.selectedItem;
	}

	getSelectedItemList() {
		this.selectedItemList = [];
		for (let index = 0; index < Object.keys(this.items.options).length; index++) {
			this.selectedItemList.push(this.items.options[index].value);
		}
		this.routingService.data.selectedItemList = this.selectedItemList;
	}

	getAllItems(collections: any, search: string) {
		let body = {
			collections: collections,
			search: search,
			page: 1,
			limitPerPage: 7,
			sort: null,
			order: null,
			columnToFilter: null,
			valueToFilter: null,
			valueLstToFilter: null,
			filters: null
		};
		this.searchService.loadCollectionsPerPage(body).subscribe((collectionsList) => {
			this.allItems = collectionsList;
			this.getCollectionList(this.allItems);
			this.navigateToSearchPage();
		}, (error) => (this.errorMessage = <any>error));
	}

	/**
   * Extract collection list from search result in 'collections'
   */
	getCollectionList(items: any) {
		this.collections = [];
		for (let index = 0; index < Object.keys(items).length; index++) {
			if (Object.keys(items)[index] !== 'summary') {
				this.collections.push(Object.keys(items)[index]);
			}
		}
		return this.collections;
	}

	navigateToSearchPage() {
		this.routingService.data.searchService = this.searchService;
		this.routingService.data.settings = this.settings;
		this.routingService.data.limitedSettings = this.limitedSettings;
		this.routingService.data.collections = this.collections;
		this.routingService.data.allItems = this.allItems;
		this.routingService.data.keyword = this.keyword;
		this.routingService.searchResult();
		let linkSearch = ['pages/search'];
		this.router.navigate(linkSearch);
	}

	navigateToEntityPage(selectedRow: any) {
		if (selectedRow.data.collectionId === 'contract' || selectedRow.data.collectionId === 'organization') {
			this.routingService.data.selectedEntity = selectedRow.data;
			this.routingService.data.settings = this.settings;
			this.routingService.entityResult();
			let linkEntity = ['pages/entityFile'];
			this.router.navigate(linkEntity);
		} else if (selectedRow.data.collectionId === 'membership-insured') {
			this.routingService.data.selectedInsured = selectedRow.data;
			this.routingService.data.settings = this.settings;
			this.routingService.insuredResult();
			let linkInsured = ['pages/insuredFile'];
			this.router.navigate(linkInsured);
		} else if (selectedRow.data.collectionId === 'policy-ident') {
			let links = selectedRow.data.links.filter((link) => link.rel === 'self');
			let url = links[0]['href'];
			this.collectionDetails.loadDetails(selectedRow.data.collectionId, url).subscribe((collectionDetails) => {
				this.routingService.data = {
					isView: true,
					contract: collectionDetails[selectedRow.data.collectionId][0]['data']
				};
				this.routingService.detailResult();
				this.router.navigate(['pages/contractDetails']);
			}, (error) => (this.errorMessage = <any>error));
		} else if (selectedRow.data.collectionId === 'agreement') {
			let links = selectedRow.data.links.filter((link) => link.rel === 'self');
			let url = links[0]['href'];
			this.collectionDetails.loadDetails(selectedRow.data.collectionId, url).subscribe((collectionDetails) => {
				this.routingService.detailResult();
				let agreementBuid = collectionDetails[selectedRow.data.collectionId][0]['data'].BUID;
				this.router.navigate(['pages/agreements/agreementDetail', agreementBuid]);
			}, (error) => (this.errorMessage = <any>error));
		}
	}
}
