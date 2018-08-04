import {
  Component, ViewChild, AfterViewInit, NgZone, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import {AuthService} from "../../../services/auth.service";

import { Page } from 'tns-core-modules/ui/page';
import { isAndroid, isIOS } from 'platform';
import { ActionItem } from 'ui/action-bar';
import {
  RadSideDrawerComponent, SideDrawerType
} from 'nativescript-ui-sidedrawer/angular';
import {
  PushTransition, SlideInOnTopTransition
} from 'nativescript-ui-sidedrawer';
import {firebase} from "nativescript-plugin-firebase/firebase-common";
import { Color } from 'color';
import { getViewById } from "tns-core-modules/ui/core/view";
import { Button } from "tns-core-modules/ui/button";
import { View } from "tns-core-modules/ui/core/view";

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
    { name: 'Sign Out', commands: ['/signout'] },
    { name: 'Manage Cards', commands: ['/cards'] }
  ];

  private drawer: SideDrawerType;
  uid:string="";
  name:string="";
  isVerified:boolean=false;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private page: Page,
    private ngZone: NgZone,
    private auth:AuthService,
  ) {

      firebase.getCurrentUser()
          .then((token)=> {
            console.log(" the token is " + token);
              this.uid = token.uid;
              if(token.emailVerified){this.isVerified=true;
              this.navMenu=[
                  { name: 'Home', commands: ['/items'] },
                  { name: 'Sign Out', commands: ['/signout'] },
                  { name: 'Manage Cards', commands: ['/cards'] }
              ]
              }

          firebase.getValue("/userInfo/"+token.uid)
              .then((res)=>{this.name=res.value.name
              })
          })
          .catch(()=>{
              this.navMenu = [
                  { name: 'Home', commands: ['/items'] },
                  { name: 'Register', commands: ['/register'] },
                  { name: 'Sign In', commands: ['/signin'] },
              ];
      });

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
  navigateTo(routeCommands: any[], args) {
    this.drawer.closeDrawer();
    let currentUrl = this.routerExtensions.router.routerState.snapshot.url;
    let newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands);
    let newUrl = this.routerExtensions.router.serializeUrl(newUrlTree);
    console.log("new url is " + newUrl);
    if (newUrl == "/signout") {
      this.onSignout();
      this.name="";
      this.uid="";
      this.navMenu = [
            { name: 'Home', commands: ['/items'] },
            { name: 'Register', commands: ['/register'] },
            { name: 'Sign In', commands: ['/signin'] },
        ];
    }

    let page = <Button>args.object;
    let view = <Button>page.getViewById("sideDrawerButton");
    view.backgroundColor = new Color("#1a626f");
    view.animate({ backgroundColor: new Color("white"), duration: 600 });

    if (currentUrl !== newUrl) {
      this.isContentVisible = false;

      this.drawer.on('drawerClosed', () => {
        this.ngZone.run(() => {
          this.routerExtensions.navigate(routeCommands,
            {
              clearHistory: false,
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
      console.log("test");
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
