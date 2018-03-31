import {
  Component, ViewChild, AfterViewInit, NgZone, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import {AuthService} from "../../../services/auth.service";

import { Page } from 'ui/page';
import { isAndroid, isIOS } from 'platform';
import { ActionItem } from 'ui/action-bar';
import {
  RadSideDrawerComponent, SideDrawerType
} from 'nativescript-ui-sidedrawer/angular';
import {
  PushTransition, SlideInOnTopTransition
} from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'side-drawer-page',
  templateUrl: 'modules/shared/side-drawer-page/side-drawer-page.component.html',
  styleUrls: ['modules/shared/side-drawer-page/side-drawer-page.component.css']
})
export class SideDrawerPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;

  /**
   * On tap of any side-drawer item, hiding content if this flag is true.
   */
  isContentVisible: boolean = true;

  /**
   * For android using SlideOnTop transition and for iOS, push transition.
   */
  drawerTransition: any;

  /**
   * Navigation Menu Items
   */
  navMenu: any[] = [
    { name: 'Home', commands: ['/items'] },
    { name: 'Register', commands: ['/register'] },
    { name: 'Sign In', commands: ['/signin'] },
    { name: 'Sign Out', commands: ['/signout'] }
  ];

  private drawer: SideDrawerType;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private page: Page,
    private ngZone: NgZone,
    private auth:AuthService,
  ) {
    this.setActionBarIcon(this.page);
    this.setDrawerTransition();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  ngOnDestroy() {
    this.drawer.off('drawerClosed');
  }

  toggleSideDrawer() {
    this.drawer.toggleDrawerState();
  }

  /**
   * Navigates to next page after drawer is closed.
   */
  navigateTo(routeCommands: any[]) {
    this.drawer.closeDrawer();
    let currentUrl = this.routerExtensions.router.routerState.snapshot.url;
    let newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands);
    let newUrl = this.routerExtensions.router.serializeUrl(newUrlTree);
    console.log("new url is " + newUrl);
    if (newUrl == "/signout") {
      this.onSignout();
    }
    if (currentUrl !== newUrl) {
      this.isContentVisible = false;

      this.drawer.on('drawerClosed', () => {
        this.ngZone.run(() => {
          this.routerExtensions.navigate(routeCommands,
            {
              clearHistory: true,
              animated: false
            });
          this.isContentVisible = true;
          this.drawer.off('drawerClosed');
        });
      });
    }
  }

  private setDrawerTransition() {
    if (isAndroid) {
      this.drawerTransition = new SlideInOnTopTransition();
    }

    if (isIOS) {
      this.drawerTransition = new PushTransition();
    }
  }

  private setActionBarIcon(page: Page) {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton();
    }

    if (isIOS) {
      page.actionBar.actionItems.addItem(this.getNavigationButton());
    }
  }

  private getNavigationButton() {
    let navActionItem = new ActionItem();
    navActionItem.icon = 'res://ic_menu_black';
    if (navActionItem.ios) {
      console.log("test")
      navActionItem.ios.position = 'left';
    }
    navActionItem.on('tap', this.toggleDrawer.bind(this));
    return navActionItem;
  }

  private toggleDrawer() {
    this.drawer.toggleDrawerState();
  }

  onSignout(){
    this.auth.signout();
  }
}
