"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var auth_service_1 = require("../../../services/auth.service");
var page_1 = require("ui/page");
var platform_1 = require("platform");
var action_bar_1 = require("ui/action-bar");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var firebase_common_1 = require("nativescript-plugin-firebase/firebase-common");
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
            { name: 'Sign In', commands: ['/signin'] },
            { name: 'Sign Out', commands: ['/signout'] },
            { name: 'Manage Cards', commands: ['/cards'] }
        ];
        this.uid = "";
        this.name = "";
        this.isVerified = false;
        firebase_common_1.firebase.getCurrentUser()
            .then(function (token) {
            console.log(token);
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
    SideDrawerPageComponent.prototype.navigateTo = function (routeCommands) {
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
        if (currentUrl !== newUrl) {
            this.isContentVisible = false;
            this.drawer.on('drawerClosed', function () {
                _this.ngZone.run(function () {
                    _this.routerExtensions.navigate(routeCommands, {
                        clearHistory: false,
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
            console.log("test");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1kcmF3ZXItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLWRyYXdlci1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUV1QjtBQUN2QiwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBRS9ELCtEQUEyRDtBQUUzRCxnQ0FBK0I7QUFDL0IscUNBQTRDO0FBQzVDLDRDQUEyQztBQUMzQyw4REFFNEM7QUFDNUMseUVBRW9DO0FBQ3BDLGdGQUFzRTtBQU90RTtJQTZCRSxpQ0FDVSxnQkFBa0MsRUFDbEMsY0FBOEIsRUFDOUIsSUFBVSxFQUNWLE1BQWMsRUFDZCxJQUFnQjtRQUwxQixpQkFrQ0c7UUFqQ08scUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBL0IxQjs7V0FFRztRQUNILHFCQUFnQixHQUFZLElBQUksQ0FBQztRQU9qQzs7V0FFRztRQUNILFlBQU8sR0FBVTtZQUNmLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0QyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7U0FDL0MsQ0FBQztRQUdGLFFBQUcsR0FBUSxFQUFFLENBQUM7UUFDZCxTQUFJ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RUFBaUU7WUFDOUUsU0FBUyxFQUFFLENBQUMsZ0VBQWdFLENBQUM7U0FDOUUsQ0FBQzt5Q0ErQjRCLHlCQUFnQjtZQUNsQix1QkFBYztZQUN4QixXQUFJO1lBQ0YsYUFBTTtZQUNULDBCQUFXO09BbENmLHVCQUF1QixDQXVKbkM7SUFBRCw4QkFBQztDQUFBLEFBdkpELElBdUpDO0FBdkpZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBOZ1pvbmUsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tICdwbGF0Zm9ybSc7XG5pbXBvcnQgeyBBY3Rpb25JdGVtIH0gZnJvbSAndWkvYWN0aW9uLWJhcic7XG5pbXBvcnQge1xuICBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZVxufSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyJztcbmltcG9ydCB7XG4gIFB1c2hUcmFuc2l0aW9uLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uXG59IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7ZmlyZWJhc2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2ZpcmViYXNlLWNvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaWRlLWRyYXdlci1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICdtb2R1bGVzL3NoYXJlZC9zaWRlLWRyYXdlci1wYWdlL3NpZGUtZHJhd2VyLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbW9kdWxlcy9zaGFyZWQvc2lkZS1kcmF3ZXItcGFnZS9zaWRlLWRyYXdlci1wYWdlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlRHJhd2VyUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBPbiB0YXAgb2YgYW55IHNpZGUtZHJhd2VyIGl0ZW0sIGhpZGluZyBjb250ZW50IGlmIHRoaXMgZmxhZyBpcyB0cnVlLlxuICAgKi9cbiAgaXNDb250ZW50VmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEZvciBhbmRyb2lkIHVzaW5nIFNsaWRlT25Ub3AgdHJhbnNpdGlvbiBhbmQgZm9yIGlPUywgcHVzaCB0cmFuc2l0aW9uLlxuICAgKi9cbiAgZHJhd2VyVHJhbnNpdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIE1lbnUgSXRlbXNcbiAgICovXG4gIG5hdk1lbnU6IGFueVtdID0gW1xuICAgIHsgbmFtZTogJ0hvbWUnLCBjb21tYW5kczogWycvaXRlbXMnXSB9LFxuICAgIHsgbmFtZTogJ1JlZ2lzdGVyJywgY29tbWFuZHM6IFsnL3JlZ2lzdGVyJ10gfSxcbiAgICB7IG5hbWU6ICdTaWduIEluJywgY29tbWFuZHM6IFsnL3NpZ25pbiddIH0sXG4gICAgeyBuYW1lOiAnU2lnbiBPdXQnLCBjb21tYW5kczogWycvc2lnbm91dCddIH0sXG4gICAgeyBuYW1lOiAnTWFuYWdlIENhcmRzJywgY29tbWFuZHM6IFsnL2NhcmRzJ10gfVxuICBdO1xuXG4gIHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcbiAgdWlkOnN0cmluZz1cIlwiO1xuICBuYW1lOnN0cmluZz1cIlwiO1xuICBpc1ZlcmlmaWVkOmJvb2xlYW49ZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcbiAgKSB7XG5cbiAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgICB0aGlzLnVpZCA9IHRva2VuLnVpZDtcbiAgICAgICAgICAgICAgaWYodG9rZW4uZW1haWxWZXJpZmllZCl7dGhpcy5pc1ZlcmlmaWVkPXRydWU7XG4gICAgICAgICAgICAgIHRoaXMubmF2TWVudT1bXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdIb21lJywgY29tbWFuZHM6IFsnL2l0ZW1zJ10gfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1NpZ24gT3V0JywgY29tbWFuZHM6IFsnL3NpZ25vdXQnXSB9LFxuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnTWFuYWdlIENhcmRzJywgY29tbWFuZHM6IFsnL2NhcmRzJ10gfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIGZpcmViYXNlLmdldFZhbHVlKFwiL3VzZXJJbmZvL1wiK3Rva2VuLnVpZClcbiAgICAgICAgICAgICAgLnRoZW4oKHJlcyk9Pnt0aGlzLm5hbWU9cmVzLnZhbHVlLm5hbWVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKT0+e1xuICAgICAgICAgICAgICB0aGlzLm5hdk1lbnUgPSBbXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdIb21lJywgY29tbWFuZHM6IFsnL2l0ZW1zJ10gfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1JlZ2lzdGVyJywgY29tbWFuZHM6IFsnL3JlZ2lzdGVyJ10gfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1NpZ24gSW4nLCBjb21tYW5kczogWycvc2lnbmluJ10gfSxcbiAgICAgICAgICAgICAgXTtcbiAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5zZXRBY3Rpb25CYXJJY29uKHRoaXMucGFnZSk7XG4gICAgICAgICAgdGhpcy5zZXREcmF3ZXJUcmFuc2l0aW9uKCk7XG4gICAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRyYXdlci5vZmYoJ2RyYXdlckNsb3NlZCcpO1xuICB9XG5cbiAgdG9nZ2xlU2lkZURyYXdlcigpIHtcbiAgICB0aGlzLmRyYXdlci50b2dnbGVEcmF3ZXJTdGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byBuZXh0IHBhZ2UgYWZ0ZXIgZHJhd2VyIGlzIGNsb3NlZC5cbiAgICovXG4gIG5hdmlnYXRlVG8ocm91dGVDb21tYW5kczogYW55W10pIHtcbiAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIGxldCBjdXJyZW50VXJsID0gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC51cmw7XG4gICAgbGV0IG5ld1VybFRyZWUgPSB0aGlzLnJvdXRlckV4dGVuc2lvbnMucm91dGVyLmNyZWF0ZVVybFRyZWUocm91dGVDb21tYW5kcyk7XG4gICAgbGV0IG5ld1VybCA9IHRoaXMucm91dGVyRXh0ZW5zaW9ucy5yb3V0ZXIuc2VyaWFsaXplVXJsKG5ld1VybFRyZWUpO1xuICAgIGNvbnNvbGUubG9nKFwibmV3IHVybCBpcyBcIiArIG5ld1VybCk7XG4gICAgaWYgKG5ld1VybCA9PSBcIi9zaWdub3V0XCIpIHtcbiAgICAgIHRoaXMub25TaWdub3V0KCk7XG4gICAgICB0aGlzLm5hbWU9XCJcIjtcbiAgICAgIHRoaXMudWlkPVwiXCI7XG4gICAgICB0aGlzLm5hdk1lbnUgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdIb21lJywgY29tbWFuZHM6IFsnL2l0ZW1zJ10gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1JlZ2lzdGVyJywgY29tbWFuZHM6IFsnL3JlZ2lzdGVyJ10gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ1NpZ24gSW4nLCBjb21tYW5kczogWycvc2lnbmluJ10gfSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRVcmwgIT09IG5ld1VybCkge1xuICAgICAgdGhpcy5pc0NvbnRlbnRWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZHJhd2VyLm9uKCdkcmF3ZXJDbG9zZWQnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKHJvdXRlQ29tbWFuZHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogZmFsc2UsXG4gICAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5pc0NvbnRlbnRWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRyYXdlci5vZmYoJ2RyYXdlckNsb3NlZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RHJhd2VyVHJhbnNpdGlvbigpIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICB0aGlzLmRyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgIH1cblxuICAgIGlmIChpc0lPUykge1xuICAgICAgdGhpcy5kcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFB1c2hUcmFuc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3Rpb25CYXJJY29uKHBhZ2U6IFBhZ2UpIHtcbiAgICBpZiAoaXNBbmRyb2lkKSB7XG4gICAgICBwYWdlLmFjdGlvbkJhci5uYXZpZ2F0aW9uQnV0dG9uID0gdGhpcy5nZXROYXZpZ2F0aW9uQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzSU9TKSB7XG4gICAgICBwYWdlLmFjdGlvbkJhci5hY3Rpb25JdGVtcy5hZGRJdGVtKHRoaXMuZ2V0TmF2aWdhdGlvbkJ1dHRvbigpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE5hdmlnYXRpb25CdXR0b24oKSB7XG4gICAgbGV0IG5hdkFjdGlvbkl0ZW0gPSBuZXcgQWN0aW9uSXRlbSgpO1xuICAgICBuYXZBY3Rpb25JdGVtLmljb24gPSAncmVzOi8vaWNfbWVudV9ibGFjayc7XG4gICAgaWYgKG5hdkFjdGlvbkl0ZW0uaW9zKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRlc3RcIilcbiAgICAgIG5hdkFjdGlvbkl0ZW0uaW9zLnBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIH1cbiAgICBuYXZBY3Rpb25JdGVtLm9uKCd0YXAnLCB0aGlzLnRvZ2dsZURyYXdlci5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gbmF2QWN0aW9uSXRlbTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlRHJhd2VyKCkge1xuICAgIHRoaXMuZHJhd2VyLnRvZ2dsZURyYXdlclN0YXRlKCk7XG4gIH1cblxuICBvblNpZ25vdXQoKXtcbiAgICB0aGlzLmF1dGguc2lnbm91dCgpO1xuICB9XG59XG4iXX0=