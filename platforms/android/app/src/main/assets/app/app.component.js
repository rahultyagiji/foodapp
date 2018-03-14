"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        firebase.init({
            // storageBucket: 'gs://dekyou-cafe.appspot.com',
            persist: false
        }).then();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Q7QUFDaEQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFRekQ7SUFHSTtJQUdBLENBQUM7SUFHRCwrQkFBUSxHQUFSO1FBRUksUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGlEQUFpRDtZQUNqRCxPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFHZCxDQUFDO0lBakJRLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzs7T0FFVyxZQUFZLENBb0J4QjtJQUFELG1CQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgICAgICAgIC8vIHN0b3JhZ2VCdWNrZXQ6ICdnczovL2Rla3lvdS1jYWZlLmFwcHNwb3QuY29tJyxcbiAgICAgICAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgICAgIH0pLnRoZW4oKTtcblxuXG4gICAgfVxuXG5cbn0iXX0=