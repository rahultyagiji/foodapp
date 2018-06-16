"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import * as pushPlugin from "nativescript-push-notifications";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Q7QUFDaEQsaUVBQWlFO0FBQ2pFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEJJO0FBT0o7SUFHSTtJQUNBLENBQUM7SUFHRCwrQkFBUSxHQUFSO1FBRUksUUFBUSxDQUFDLElBQUksQ0FBQztZQUNWLGlEQUFpRDtZQUNqRCxPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVjs7Ozs7Ozs7Ozs7OzthQWFLO0lBQ1QsQ0FBQztJQTVCUSxZQUFZO1FBTHhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7O09BRVcsWUFBWSxDQTZCeEI7SUFBRCxtQkFBQztDQUFBLEFBN0JELElBNkJDO0FBN0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vIGltcG9ydCAqIGFzIHB1c2hQbHVnaW4gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wdXNoLW5vdGlmaWNhdGlvbnNcIjtcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbi8qY29uc3QgaW9zU2V0dGluZ3MgPSB7XG4gICAgYmFkZ2U6IHRydWUsXG4gICAgc291bmQ6IHRydWUsXG4gICAgYWxlcnQ6IHRydWUsXG4gICAgY2xlYXJCYWRnZTogZmFsc2UsXG4gICAgaW50ZXJhY3RpdmVTZXR0aW5nczoge1xuICAgICAgICBhY3Rpb25zOiBbe1xuICAgICAgICAgICAgaWRlbnRpZmllcjogJ1JFQURfSURFTlRJRklFUicsXG4gICAgICAgICAgICB0aXRsZTogJ1JlYWQnLFxuICAgICAgICAgICAgYWN0aXZhdGlvbk1vZGU6IFwiZm9yZWdyb3VuZFwiLFxuICAgICAgICAgICAgZGVzdHJ1Y3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25SZXF1aXJlZDogZmFsc2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWRlbnRpZmllcjogJ0NBTkNFTF9JREVOVElGSUVSJyxcbiAgICAgICAgICAgIHRpdGxlOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGFjdGl2YXRpb25Nb2RlOiBcImZvcmVncm91bmRcIixcbiAgICAgICAgICAgIGRlc3RydWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25SZXF1aXJlZDogZmFsc2VcbiAgICAgICAgfV0sXG4gICAgICAgIGNhdGVnb3JpZXM6IFt7XG4gICAgICAgICAgICBpZGVudGlmaWVyOiAnUkVBRF9DQVRFR09SWScsXG4gICAgICAgICAgICBhY3Rpb25zRm9yRGVmYXVsdENvbnRleHQ6IFsnUkVBRF9JREVOVElGSUVSJywgJ0NBTkNFTF9JREVOVElGSUVSJ10sXG4gICAgICAgICAgICBhY3Rpb25zRm9yTWluaW1hbENvbnRleHQ6IFsnUkVBRF9JREVOVElGSUVSJywgJ0NBTkNFTF9JREVOVElGSUVSJ11cbiAgICAgICAgfV1cbiAgICB9LFxuICAgIG5vdGlmaWNhdGlvbkNhbGxiYWNrSU9TOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGFsZXJ0KFwiTWVzc2FnZSByZWNlaXZlZCFcXG5cIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB9XG59OyovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgZmlyZWJhc2UuaW5pdCh7XG4gICAgICAgICAgICAvLyBzdG9yYWdlQnVja2V0OiAnZ3M6Ly9kZWt5b3UtY2FmZS5hcHBzcG90LmNvbScsXG4gICAgICAgICAgICBwZXJzaXN0OiBmYWxzZVxuICAgICAgICB9KS50aGVuKCk7XG5cbiAgICAgICAgLypwdXNoUGx1Z2luLnJlZ2lzdGVyKGlvc1NldHRpbmdzLCAodG9rZW46IFN0cmluZykgPT4ge1xuICAgICAgICAgICAgYWxlcnQoXCJEZXZpY2UgcmVnaXN0ZXJlZC4gQWNjZXNzIHRva2VuOiBcIiArIHRva2VuKTtcblxuICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIGludGVyYWN0aXZlIHNldHRpbmdzXG4gICAgICAgICAgICBpZihpb3NTZXR0aW5ncy5pbnRlcmFjdGl2ZVNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgcHVzaFBsdWdpbi5yZWdpc3RlclVzZXJOb3RpZmljYXRpb25TZXR0aW5ncygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdTdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCBmb3IgaW50ZXJhY3RpdmUgcHVzaC4nKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvciByZWdpc3RlcmluZyBmb3IgaW50ZXJhY3RpdmUgcHVzaDogJyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyb3JNZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRGV2aWNlIE5PVCByZWdpc3RlcmVkISBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yTWVzc2FnZSkpO1xuICAgICAgICB9KTsqL1xuICAgIH1cbn0iXX0=