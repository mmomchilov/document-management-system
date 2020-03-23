import { Component, ElementRef, HostListener, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../theme';

import 'style-loader!./baSidebar.scss';

@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html'
})
export class BaSidebar implements OnInit, OnDestroy, AfterViewInit {
  public menuHeight: number;
  public isMenuCollapsed: boolean = false;
  public isMenuShouldCollapsed: boolean = true;
  subscribed = {};

  constructor(private _elementRef: ElementRef, private _state: GlobalState) {
    var collapse = (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    };
    this._state.subscribe('menu.isCollapsed', 'sideMenuCollapse', collapse);
    this.subscribed['menu.isCollapsed'] = 'sideMenuCollapse';
  }

  public ngOnInit(): void {
    // console.log('_state', this._state);
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
    this.menuCollapse();
  }

  ngOnDestroy() {
    Object.keys(this.subscribed).forEach(eventId => {
      this._state.unsubscribe(eventId, this.subscribed[eventId]);
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    this._state.subscribe('menu.isCollapsed', 'baMenuCollapse', (isCollapsed) => {

     // console.log('isCollapsed', isCollapsed);

      this.isMenuCollapsed = isCollapsed;
    });
    // this._state.subscribe('config.displayableColumns', 'pagesDisplayCol', displayCol);
    return false;
  }

  @HostListener('window:resize')
  public onWindowResize(): void {

    var isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    // TODO: get rid of magic 84 constant
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  private _shouldMenuCollapse(): boolean {
    return true;
    //return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
