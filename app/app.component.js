"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import * as pushPlugin from "nativescript-push-notifications";
var firebase = require("nativescript-plugin-firebase");
/*const iosSettings = {
    badge: true,
    sound: true,
    alert: true,
    clearBadge: false,
    interactiveSettings: {
        actions: [{
            identifier: 'READ_IDENTIFIER',
            title: 'Read',
            activationMode: "foreground",
            destructive: false,
            authenticationRequired: false
        }, {
            identifier: 'CANCEL_IDENTIFIER',
            title: 'Cancel',
            activationMode: "foreground",
            destructive: true,
            authenticationRequired: false
        }],
        categories: [{
            identifier: 'READ_CATEGORY',
            actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
            actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
        }]
    },
    notificationCallbackIOS: (message: any) => {
        alert("Message received!\n" + JSON.stringify(message));
    }
};*/
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        firebase.init({
            // storageBucket: 'gs://dekyou-cafe.appspot.com',
            persist: false
        }).then();
        /*pushPlugin.register(iosSettings, (token: String) => {
            alert("Device registered. Access token: " + token);

            // Register the interactive settings
            if(iosSettings.interactiveSettings) {
                pushPlugin.registerUserNotificationSettings(() => {
                    alert('Successfully registered for interactive push.');
                }, (err) => {
                    alert('Error registering for interactive push: ' + JSON.stringify(err));
                });
            }
        }, (errorMessage: any) => {
            alert("Device NOT registered! " + JSON.stringify(errorMessage));
        });*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Q7QUFDaEQsZ0VBQWdFO0FBQ2hFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEJJO0FBT0o7SUFHSTtJQUNBLENBQUM7SUFHRCwrQkFBUSxHQUFSO1FBRUksUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGlEQUFpRDtZQUNqRCxPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVjs7Ozs7Ozs7Ozs7OzthQWFLO0lBQ1QsQ0FBQztJQTVCUSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7O09BRVcsWUFBWSxDQTZCeEI7SUFBRCxtQkFBQztDQUFBLEFBN0JELElBNkJDO0FBN0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0ICogYXMgcHVzaFBsdWdpbiBmcm9tIFwibmF0aXZlc2NyaXB0LXB1c2gtbm90aWZpY2F0aW9uc1wiO1xuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuLypjb25zdCBpb3NTZXR0aW5ncyA9IHtcbiAgICBiYWRnZTogdHJ1ZSxcbiAgICBzb3VuZDogdHJ1ZSxcbiAgICBhbGVydDogdHJ1ZSxcbiAgICBjbGVhckJhZGdlOiBmYWxzZSxcbiAgICBpbnRlcmFjdGl2ZVNldHRpbmdzOiB7XG4gICAgICAgIGFjdGlvbnM6IFt7XG4gICAgICAgICAgICBpZGVudGlmaWVyOiAnUkVBRF9JREVOVElGSUVSJyxcbiAgICAgICAgICAgIHRpdGxlOiAnUmVhZCcsXG4gICAgICAgICAgICBhY3RpdmF0aW9uTW9kZTogXCJmb3JlZ3JvdW5kXCIsXG4gICAgICAgICAgICBkZXN0cnVjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblJlcXVpcmVkOiBmYWxzZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZGVudGlmaWVyOiAnQ0FOQ0VMX0lERU5USUZJRVInLFxuICAgICAgICAgICAgdGl0bGU6ICdDYW5jZWwnLFxuICAgICAgICAgICAgYWN0aXZhdGlvbk1vZGU6IFwiZm9yZWdyb3VuZFwiLFxuICAgICAgICAgICAgZGVzdHJ1Y3RpdmU6IHRydWUsXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblJlcXVpcmVkOiBmYWxzZVxuICAgICAgICB9XSxcbiAgICAgICAgY2F0ZWdvcmllczogW3tcbiAgICAgICAgICAgIGlkZW50aWZpZXI6ICdSRUFEX0NBVEVHT1JZJyxcbiAgICAgICAgICAgIGFjdGlvbnNGb3JEZWZhdWx0Q29udGV4dDogWydSRUFEX0lERU5USUZJRVInLCAnQ0FOQ0VMX0lERU5USUZJRVInXSxcbiAgICAgICAgICAgIGFjdGlvbnNGb3JNaW5pbWFsQ29udGV4dDogWydSRUFEX0lERU5USUZJRVInLCAnQ0FOQ0VMX0lERU5USUZJRVInXVxuICAgICAgICB9XVxuICAgIH0sXG4gICAgbm90aWZpY2F0aW9uQ2FsbGJhY2tJT1M6IChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgYWxlcnQoXCJNZXNzYWdlIHJlY2VpdmVkIVxcblwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgIH1cbn07Ki9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBmaXJlYmFzZS5pbml0KHtcbiAgICAgICAgICAgIC8vIHN0b3JhZ2VCdWNrZXQ6ICdnczovL2Rla3lvdS1jYWZlLmFwcHNwb3QuY29tJyxcbiAgICAgICAgICAgIHBlcnNpc3Q6IGZhbHNlXG4gICAgICAgIH0pLnRoZW4oKTtcblxuICAgICAgICAvKnB1c2hQbHVnaW4ucmVnaXN0ZXIoaW9zU2V0dGluZ3MsICh0b2tlbjogU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBhbGVydChcIkRldmljZSByZWdpc3RlcmVkLiBBY2Nlc3MgdG9rZW46IFwiICsgdG9rZW4pO1xuXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgaW50ZXJhY3RpdmUgc2V0dGluZ3NcbiAgICAgICAgICAgIGlmKGlvc1NldHRpbmdzLmludGVyYWN0aXZlU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBwdXNoUGx1Z2luLnJlZ2lzdGVyVXNlck5vdGlmaWNhdGlvblNldHRpbmdzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1N1Y2Nlc3NmdWxseSByZWdpc3RlcmVkIGZvciBpbnRlcmFjdGl2ZSBwdXNoLicpO1xuICAgICAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIHJlZ2lzdGVyaW5nIGZvciBpbnRlcmFjdGl2ZSBwdXNoOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJEZXZpY2UgTk9UIHJlZ2lzdGVyZWQhIFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgIH0pOyovXG4gICAgfVxufSJdfQ==