import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
// mport { ContractsListModule } from 'app/pages/policy-ident/contractsList/contractsList.module';

/**
 * RoutingService
 * The main goal of an application context is to share data among components through routing / navigation
 */
@Injectable()
export class RoutingService {
  private _previousUrl: string;  // use on goBack navigation
  private _currentUrl: string;
  private _routeHistory: string[];
  private historyMax: number = 10; // maximum stored urls

  data: any = {};
  value: any = {};
  allData: any = {};

  // Welcome message
  isWelcome: boolean = true;

  // Search module
  searchCallback: any = {
    callBack: null,
    targetComponent: null
  };

  constructor(router: Router) {
    this._routeHistory = [];
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._setURLs(event);
      });
  }
  private _setURLs(event: NavigationEnd): void {
    const tempUrl = this._currentUrl;
    this._previousUrl = tempUrl;
    this._currentUrl = event.urlAfterRedirects;
    if (event.urlAfterRedirects === this._routeHistory[this._routeHistory.length - 2]) {
      this._routeHistory.splice(this._routeHistory.length - 1, 1);
    } else {
      if (this._routeHistory.length > this.historyMax) { this._routeHistory.shift(); }
      this._routeHistory.push(event.urlAfterRedirects);
    }
  }

  get routeHistory() {
    return this._routeHistory;
  }
  get previousUrl(): string {
    return this._routeHistory[this._routeHistory.length - 2];
  }

  get currentUrl(): string {
    return this._currentUrl;
  }

  searchResult() {
    if (this.searchCallback.callBack && this.searchCallback.targetComponent) {
      this.searchCallback.callBack(this.data.settings, this.data.limitedSettings, this.data.allItems, this.data.collections,
        this.searchCallback.targetComponent, this.data.keyword);
    }
  }

  // Entity File module
  entityCallback: any = {
    callBack: null,
    targetComponent: null
  };
  entityResult() {
    if (this.entityCallback.callBack && this.entityCallback.targetComponent) {
      this.entityCallback.callBack(this.data.settings, this.data.selectedEntity, this.entityCallback.targetComponent);
    }
  }

  // Collection details module
  detailCallback: any = {
    callBack: null,
    targetComponent: null
  };
  detailResult() {
    if (this.detailCallback.callBack && this.detailCallback.targetComponent) {
      this.detailCallback.callBack(this.data.contract, this.data.isView, this.detailCallback.targetComponent);
    }
  }

  // Insured File module
  insuredCallback: any = {
    callBack: null,
    targetComponent: null
  };
  insuredResult() {
    if (this.insuredCallback.callBack && this.insuredCallback.targetComponent) {
      this.insuredCallback.callBack(this.data.settings, this.data.selectedInsured, this.insuredCallback.targetComponent); //ICI
    }
  }
}
