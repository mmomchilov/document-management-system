import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { BaMenuService } from '../../services';
import { GlobalState } from '../../../global.state';

import 'style-loader!./baMenu.scss';

@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html'
})
export class BaMenu {

  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;

  constructor(private _router: Router, private _service: BaMenuService, private _state: GlobalState) {
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    // console.log('newMenuItems', newMenuItems);
    //  console.log('newMenuItems', [newMenuItems[4], newMenuItems[5]]);
    this.menuItems = [{
      id: 'TCreferential',
      title: 'localizationResource.common.title.documents.longLabel',
      icon: 'fa fa-files-o',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "documents"] },
      target: '',
      pathMatch: 'full'
    },
    {
      id: 'TCreferential',
      title: 'localizationResource.common.title.structure.longLabel',
      icon: 'fa fa-sitemap',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "structure"] },
      target: '',
      pathMatch: 'full'
    },
    {
      id: 'TCreferential',
      title: 'localizationResource.common.title.trash.longLabel',
      icon: 'fa fa-trash',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "trash"] },
      target: '',
      pathMatch: 'full'
    },
    {
      id: 'TCreferential',
      title: 'localizationResource.common.title.lists.longLabel',
      icon: 'fa fa-list',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "lists"] },
      target: '',
      pathMatch: 'full'
    }, {
      id: 'TCreferential',
      title: 'localizationResource.common.title.settings.longLabel',
      icon: 'fa fa-cogs',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "settings"] },
      target: '',
      pathMatch: 'full'
    },
    {
      id: 'TCreferential',
      title: 'localizationResource.common.title.admin.longLabel',
      icon: 'fa fa-user',
      selected: false,
      expanded: false,
      order: 200,
      route: { path: [], data: {}, paths: ["/", "pages", "admin"] },
      target: '',
      pathMatch: 'full'
    }];
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  public toggleSubMenu($event): boolean {
    let submenu = jQuery($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
