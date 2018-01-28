import {Component, Input, OnInit} from "@angular/core";
import {UserService, NotificationService} from "../../../services/services";
import {NewMessageModalComponent} from '../new-message-modal/new-message-modal.component';
import * as $ from 'jquery';

@Component({
    selector: "app-navbar",
    templateUrl: "./app-navbar.component.html",
    styleUrls: ["./app-navbar.component.scss"]
})
export class AppNavBarComponent implements OnInit {

    @Input("active") protected active: string;
    notifications: any[] = [];
    messages: any[] = [];
    userMenuOpen = false;
    searchOpen = false;
    messagesOpen = false;
    notificationOpen = false;
    constructor(
      private _userService: UserService,
      private _notificationservice: NotificationService
    ) {
        //console.log(this._userService.getLoggedInUser());
    }

    ngOnInit() {
        this._notificationservice.getNotifications(1, 5).subscribe(resp => {
            if (resp["error"] === false) {
                this.notifications = resp["Notifications"];
            }
        }, error => {
            console.log(error);
        });
        this._notificationservice.getMessages(1, 5).subscribe(resp => {
            //console.log(resp);
            if (resp["error"] === false) {
                this.messages = resp["Messages"];
            }
        }, error => {
            console.log(error);
        });

        $('body')
          .removeClass('_bg_white')
          .addClass('_bg_gray');
    }

    openRightMenu(variable) {
      const oldCondition = this[variable];

      this.userMenuOpen = false;
      this.searchOpen = false;
      this.messagesOpen = false;
      this.notificationOpen = false;

      this[variable] = !oldCondition;
    }
}
