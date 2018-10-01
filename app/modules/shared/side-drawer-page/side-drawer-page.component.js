"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var auth_service_1 = require("../../../services/auth.service");
var page_1 = require("tns-core-modules/ui/page");
var platform_1 = require("platform");
var action_bar_1 = require("ui/action-bar");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var firebase_common_1 = require("nativescript-plugin-firebase/firebase-common");
var color_1 = require("color");
var SideDrawerPageComponent = /** @class */ (function () {
    function SideDrawerPageComponent(routerExtensions, activatedRoute, page, ngZone, auth) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.activatedRoute = activatedRoute;
        this.page = page;
        this.ngZone = ngZone;
        this.auth = auth;
        /**
         * On tap of any side-drawer item, hiding content if this flag is true.
         */
        this.isContentVisible = true;
        /**
         * Navigation Menu Items
         */
        this.navMenu = [
            { name: 'Home', commands: ['/items'] },
            { name: 'Register', commands: ['/register'] },
            { name: 'Sign In', commands: ['/signin'] }
        ];
        this.uid = "";
        this.name = "";
        this.isVerified = false;
        firebase_common_1.firebase.getCurrentUser()
            .then(function (token) {
            console.log(" the token is " + token);
            _this.uid = token.uid;
            if (token.emailVerified) {
                _this.isVerified = true;
                _this.navMenu = [
                    { name: 'Home', commands: ['/items'] },
                    { name: 'Sign Out', commands: ['/signout'] },
                    { name: 'Manage Cards', commands: ['/cards'] }
                ];
            }
            firebase_common_1.firebase.getValue("/userInfo/" + token.uid)
                .then(function (res) {
                _this.name = res.value.name;
            });
        })
            .catch(function () {
            _this.navMenu = [
                { name: 'Home', commands: ['/items'] },
                { name: 'Register', commands: ['/register'] },
                { name: 'Sign In', commands: ['/signin'] },
            ];
        });
        this.setActionBarIcon(this.page);
        this.setDrawerTransition();
    }
    SideDrawerPageComponent.prototype.ngAfterViewInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
    };
    SideDrawerPageComponent.prototype.ngOnDestroy = function () {
        this.drawer.off('drawerClosed');
    };
    SideDrawerPageComponent.prototype.toggleSideDrawer = function () {
        this.drawer.toggleDrawerState();
    };
    /**
     * Navigates to next page after drawer is closed.
     */
    SideDrawerPageComponent.prototype.navigateTo = function (routeCommands, args) {
        var _this = this;
        this.drawer.closeDrawer();
        var currentUrl = this.routerExtensions.router.routerState.snapshot.url;
        var newUrlTree = this.routerExtensions.router.createUrlTree(routeCommands);
        var newUrl = this.routerExtensions.router.serializeUrl(newUrlTree);
        console.log("new url is " + newUrl);
        if (newUrl == "/signout") {
            this.onSignout();
            this.name = "";
            this.uid = "";
            this.navMenu = [
                { name: 'Home', commands: ['/items'] },
                { name: 'Register', commands: ['/register'] },
                { name: 'Sign In', commands: ['/signin'] },
            ];
        }
        var page = args.object;
        var view = page.getViewById("sideDrawerButton");
        view.backgroundColor = new color_1.Color("#1a626f");
        view.animate({ backgroundColor: new color_1.Color("white"), duration: 600 });
        if (currentUrl !== newUrl) {
            this.isContentVisible = false;
            this.drawer.on('drawerClosed', function () {
                _this.ngZone.run(function () {
                    _this.routerExtensions.navigate(routeCommands, {
                        clearHistory: true,
                        animated: false
                    });
                    _this.isContentVisible = true;
                    _this.drawer.off('drawerClosed');
                });
            });
        }
    };
    SideDrawerPageComponent.prototype.setDrawerTransition = function () {
        if (platform_1.isAndroid) {
            this.drawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        }
        if (platform_1.isIOS) {
            this.drawerTransition = new nativescript_ui_sidedrawer_1.PushTransition();
        }
    };
    SideDrawerPageComponent.prototype.setActionBarIcon = function (page) {
        if (platform_1.isAndroid) {
            page.actionBar.navigationButton = this.getNavigationButton();
        }
        if (platform_1.isIOS) {
            page.actionBar.actionItems.addItem(this.getNavigationButton());
        }
    };
    SideDrawerPageComponent.prototype.getNavigationButton = function () {
        var navActionItem = new action_bar_1.ActionItem();
        navActionItem.icon = 'res://ic_menu_black';
        if (navActionItem.ios) {
            navActionItem.ios.position = 'left';
        }
        navActionItem.on('tap', this.toggleDrawer.bind(this));
        return navActionItem;
    };
    SideDrawerPageComponent.prototype.toggleDrawer = function () {
        this.drawer.toggleDrawerState();
    };
    SideDrawerPageComponent.prototype.onSignout = function () {
        this.auth.signout();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SideDrawerPageComponent.prototype, "drawerComponent", void 0);
    SideDrawerPageComponent = __decorate([
        core_1.Component({
            selector: 'side-drawer-page',
            templateUrl: 'modules/shared/side-drawer-page/side-drawer-page.component.html',
            styleUrls: ['modules/shared/side-drawer-page/side-drawer-page.component.css']
        }),
        __metadata("design:paramtypes", [router_2.RouterExtensions,
            router_1.ActivatedRoute,
            page_1.Page,
            core_1.NgZone,
            auth_service_1.AuthService])
    ], SideDrawerPageComponent);
    return SideDrawerPageComponent;
}());
exports.SideDrawerPageComponent = SideDrawerPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1kcmF3ZXItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLWRyYXdlci1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUV1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBRS9ELCtEQUEyRDtBQUUzRCxpREFBZ0Q7QUFDaEQscUNBQTRDO0FBQzVDLDRDQUEyQztBQUMzQyw4REFFNEM7QUFDNUMseUVBRW9DO0FBQ3BDLGdGQUFzRTtBQUN0RSwrQkFBOEI7QUFVOUI7SUEyQkUsaUNBQ1UsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLElBQVUsRUFDVixNQUFjLEVBQ2QsSUFBZ0I7UUFMMUIsaUJBa0NHO1FBakNPLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBWTtRQTdCMUI7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFPakM7O1dBRUc7UUFDSCxZQUFPLEdBQVU7WUFDZixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTtTQUMzQyxDQUFDO1FBR0YsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLFNBQUksR0FBUSxFQUFFLENBQUM7UUFDZixlQUFVLEdBQVMsS0FBSyxDQUFDO1FBVXJCLDBCQUFRLENBQUMsY0FBYyxFQUFFO2FBQ3BCLElBQUksQ0FBQyxVQUFDLEtBQUs7WUFDVixPQUFPLENBQUMs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QUM7SUExSmtDO1FBQWxDLGdCQUFTLENBQUMsZ0NBQXNCLENBQUM7a0NBQWtCLGdDQUFzQjtvRUFBQztJQURoRSx1QkFBdUI7UUFMbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGlFQUFpRTtZQUM5RSxTQUFTLEVBQUUsQ0FBQyxnRUFBZ0UsQ0FBQztTQUM5RSxDQUFDO3lDQTZCNEIseUJBQWdCO1lBQ2xCLHVCQUFjO1lBQ3hCLFdBQUk7WUFDRixhQUFNO1lBQ1QsMEJBQVc7T0FoQ2YsdUJBQXVCLENBNEpuQztJQUFELDhCQUFDO0NBQUEsQUE1SkQsSUE0SkM7QUE1SlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE5nWm9uZSwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZSc7XG5pbXBvcnQgeyBpc0FuZHJvaWQsIGlzSU9TIH0gZnJvbSAncGxhdGZvcm0nO1xuaW1wb3J0IHsgQWN0aW9uSXRlbSB9IGZyb20gJ3VpL2FjdGlvbi1iYXInO1xuaW1wb3J0IHtcbiAgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGVcbn0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhcic7XG5pbXBvcnQge1xuICBQdXNoVHJhbnNpdGlvbiwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvblxufSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5pbXBvcnQge2ZpcmViYXNlfSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9maXJlYmFzZS1jb21tb25cIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgZ2V0Vmlld0J5SWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaWRlLWRyYXdlci1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICdtb2R1bGVzL3NoYXJlZC9zaWRlLWRyYXdlci1wYWdlL3NpZGUtZHJhd2VyLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kdWxlcy9zaGFyZWQvc2lkZS1kcmF3ZXItcGFnZS9zaWRlLWRyYXdlci1wYWdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlRHJhd2VyUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBPbiB0YXAgb2YgYW55IHNpZGUtZHJhd2VyIGl0ZW0sIGhpZGluZyBjb250ZW50IGlmIHRoaXMgZmxhZyBpcyB0cnVlLlxuICAgKi9cbiAgaXNDb250ZW50VmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEZvciBhbmRyb2lkIHVzaW5nIFNsaWRlT25Ub3AgdHJhbnNpdGlvbiBhbmQgZm9yIGlPUywgcHVzaCB0cmFuc2l0aW9uLlxuICAgKi9cbiAgZHJhd2VyVHJhbnNpdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIE1lbnUgSXRlbXNcbiAgICovXG4gIG5hdk1lbnU6IGFueVtdID0gW1xuICAgIHsgbmFtZTogJ0hvbWUnLCBjb21tYW5kczogWycvaXRlbXMnXSB9LFxuICAgIHsgbmFtZTogJ1JlZ2lzdGVyJywgY29tbWFuZHM6IFsnL3JlZ2lzdGVyJ10gfSxcbiAgICB7IG5hbWU6ICdTaWduIEluJywgY29tbWFuZHM6IFsnL3NpZ25pbiddIH1cbiAgXTtcblxuICBwcml2YXRlIGRyYXdlcjogU2lkZURyYXdlclR5cGU7XG4gIHVpZDpzdHJpbmc9XCJcIjtcbiAgbmFtZTpzdHJpbmc9XCJcIjtcbiAgaXNWZXJpZmllZDpib29sZWFuPWZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXG4gICkge1xuXG4gICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgLnRoZW4oKHRva2VuKT0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIHRoZSB0b2tlbiBpcyBcIiArIHRva2VuKTtcbiAgICAgICAgICAgICAgdGhpcy51aWQgPSB0b2tlbi51aWQ7XG4gICAgICAgICAgICAgIGlmKHRva2VuLmVtYWlsVmVyaWZpZWQpe3RoaXMuaXNWZXJpZmllZD10cnVlO1xuICAgICAgICAgICAgICB0aGlzLm5hdk1lbnU9W1xuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnSG9tZScsIGNvbW1hbmRzOiBbJy9pdGVtcyddIH0sXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdTaWduIE91dCcsIGNvbW1hbmRzOiBbJy9zaWdub3V0J10gfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ01hbmFnZSBDYXJkcycsIGNvbW1hbmRzOiBbJy9jYXJkcyddIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZShcIi91c2VySW5mby9cIit0b2tlbi51aWQpXG4gICAgICAgICAgICAgIC50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCk9PntcbiAgICAgICAgICAgICAgdGhpcy5uYXZNZW51ID0gW1xuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnSG9tZScsIGNvbW1hbmRzOiBbJy9pdGVtcyddIH0sXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdSZWdpc3RlcicsIGNvbW1hbmRzOiBbJy9yZWdpc3RlciddIH0sXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdTaWduIEluJywgY29tbWFuZHM6IFsnL3NpZ25pbiddIH0sXG4gICAgICAgICAgICAgIF07XG4gICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0QWN0aW9uQmFySWNvbih0aGlzLnBhZ2UpO1xuICAgICAgICAgIHRoaXMuc2V0RHJhd2VyVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmF3ZXIub2ZmKCdkcmF3ZXJDbG9zZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZVNpZGVEcmF3ZXIoKSB7XG4gICAgdGhpcy5kcmF3ZXIudG9nZ2xlRHJhd2VyU3RhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gbmV4dCBwYWdlIGFmdGVyIGRyYXdlciBpcyBjbG9zZWQuXG4gICAqL1xuICBuYXZpZ2F0ZVRvKHJvdXRlQ29tbWFuZHM6IGFueVtdLCBhcmdzKSB7XG4gICAgdGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcbiAgICBsZXQgY3VycmVudFVybCA9IHRoaXMucm91dGVyRXh0ZW5zaW9ucy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsO1xuICAgIGxldCBuZXdVcmxUcmVlID0gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLnJvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlQ29tbWFuZHMpO1xuICAgIGxldCBuZXdVcmwgPSB0aGlzLnJvdXRlckV4dGVuc2lvbnMucm91dGVyLnNlcmlhbGl6ZVVybChuZXdVcmxUcmVlKTtcbiAgICBjb25zb2xlLmxvZyhcIm5ldyB1cmwgaXMgXCIgKyBuZXdVcmwpO1xuICAgIGlmIChuZXdVcmwgPT0gXCIvc2lnbm91dFwiKSB7XG4gICAgICB0aGlzLm9uU2lnbm91dCgpO1xuICAgICAgdGhpcy5uYW1lPVwiXCI7XG4gICAgICB0aGlzLnVpZD1cIlwiO1xuICAgICAgdGhpcy5uYXZNZW51ID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnSG9tZScsIGNvbW1hbmRzOiBbJy9pdGVtcyddIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdSZWdpc3RlcicsIGNvbW1hbmRzOiBbJy9yZWdpc3RlciddIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdTaWduIEluJywgY29tbWFuZHM6IFsnL3NpZ25pbiddIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbGV0IHBhZ2UgPSA8QnV0dG9uPmFyZ3Mub2JqZWN0O1xuICAgIGxldCB2aWV3ID0gPEJ1dHRvbj5wYWdlLmdldFZpZXdCeUlkKFwic2lkZURyYXdlckJ1dHRvblwiKTtcbiAgICB2aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiMxYTYyNmZcIik7XG4gICAgdmlldy5hbmltYXRlKHsgYmFja2dyb3VuZENvbG9yOiBuZXcgQ29sb3IoXCJ3aGl0ZVwiKSwgZHVyYXRpb246IDYwMCB9KTtcblxuICAgIGlmIChjdXJyZW50VXJsICE9PSBuZXdVcmwpIHtcbiAgICAgIHRoaXMuaXNDb250ZW50VmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmRyYXdlci5vbignZHJhd2VyQ2xvc2VkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShyb3V0ZUNvbW1hbmRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXG4gICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5pc0NvbnRlbnRWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRyYXdlci5vZmYoJ2RyYXdlckNsb3NlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RHJhd2VyVHJhbnNpdGlvbigpIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmRyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIGlmIChpc0lPUykge1xuICAgICAgdGhpcy5kcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFB1c2hUcmFuc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3Rpb25CYXJJY29uKHBhZ2U6IFBhZ2UpIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICBwYWdlLmFjdGlvbkJhci5uYXZpZ2F0aW9uQnV0dG9uID0gdGhpcy5nZXROYXZpZ2F0aW9uQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzSU9TKSB7XG4gICAgICBwYWdlLmFjdGlvbkJhci5hY3Rpb25JdGVtcy5hZGRJdGVtKHRoaXMuZ2V0TmF2aWdhdGlvbkJ1dHRvbigpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE5hdmlnYXRpb25CdXR0b24oKSB7XG4gICAgbGV0IG5hdkFjdGlvbkl0ZW0gPSBuZXcgQWN0aW9uSXRlbSgpO1xuICAgIG5hdkFjdGlvbkl0ZW0uaWNvbiA9ICdyZXM6Ly9pY19tZW51X2JsYWNrJztcblxuICAgIGlmIChuYXZBY3Rpb25JdGVtLmlvcykge1xuICAgICAgbmF2QWN0aW9uSXRlbS5pb3MucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgfVxuICAgIFxuICAgIG5hdkFjdGlvbkl0ZW0ub24oJ3RhcCcsIHRoaXMudG9nZ2xlRHJhd2VyLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBuYXZBY3Rpb25JdGVtO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVEcmF3ZXIoKSB7XG4gICAgdGhpcy5kcmF3ZXIudG9nZ2xlRHJhd2VyU3RhdGUoKTtcbiAgfVxuXG4gIG9uU2lnbm91dCgpe1xuICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gIH1cbn1cbiJdfQ==