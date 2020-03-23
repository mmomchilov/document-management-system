import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { AppState } from './app.service';
// import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner,
// ConfigLoaderService, TranslationLoaderService } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { TranslateService } from '@ngx-translate/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnDestroy {
  private userInfo: any;

  public isMenuCollapsed: boolean = false;
  subscribed = {};

  constructor(private _state: GlobalState,
    // private _imageLoader: BaImageLoaderService,
    // private _configLoader: ConfigLoaderService,
    // private _translationLoader: TranslationLoaderService,
    // private _spinner: BaThemeSpinner,
    // private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig
    // private translate: TranslateService
  ) {

    themeConfig.config();

    var userLang: string = navigator.language.split('-')[0];
    userLang = /(fr|en)/gi.test(userLang) ? this.getUserLang(userLang) : 'en_EN';

    // this._loadImages();
    this._loadTranslation(userLang);
    this._loadConfig();

    const action = (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    };
    this._state.subscribe('menu.isCollapsed', 'appMenuCollapse', action);
    this.subscribed['menu.isCollapsed'] = action;
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    // BaThemePreloader.load().then((values) => {
    //   this._spinner.hide();
    // });
  }

  public ngOnDestroy() {
    Object.keys(this.subscribed).forEach(eventId => {
      this._state.unsubscribe(eventId, this.subscribed[eventId]);
    }
    );
  }

  private _loadImages(): void {
    // register some loaders
    // BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

  private _loadConfig(): void {
    // register some loaders
    //  BaThemePreloader.registerLoader(this._configLoader.load());
    const reload = (values) => {
      this.reloadCache(values.type, ('spin' in values) ? values.spin : true);
    };
    this._state.subscribe('config.reloadCache', 'appReloadCache', reload);
    this.subscribed['config.reloadCache'] = reload;
  }

  private _loadTranslation(userLang: string): void {
    // register some loaders
    //  BaThemePreloader.registerLoader(this._translationLoader.load(userLang));
  }

  private getUserLang(userLang: string) {
    if (userLang === 'fr') {
      userLang = 'fr_FR';
    } else if (userLang === 'en') {
      userLang = 'en_EN';
    }
    return userLang;
  }

  private reloadCache(type: string, spin: boolean = true) {
    console.log('reloadCache for ' + type);
    if (spin) {
      // this._spinner.show();
    }
    // let promises = [];
    // promises.push(this._configLoader.load());
    // Promise.all(promises).then(result => {
    //   if (spin) {
    //     this._spinner.hide();
    //   }
    // }).catch(err => {
    //   console.error(err);
    //   if (spin) {
    //     this._spinner.hide();
    //   }
    // });
  }

}
