import { Component, Input, OnInit } from "@angular/core";
import { UserService, NotificationService, AccountSettingService } from "../../../services/services";
import { NewMessageModalComponent } from '../new-message-modal/new-message-modal.component';
import * as $ from 'jquery';

@Component({
  selector    : "app-navbar",
  templateUrl : "./app-navbar.component.html",
  styleUrls   : ["./app-navbar.component.scss"]
})
export class AppNavBarComponent implements OnInit {
  @Input("active") protected active: string;
  notifications    : any[] = [];
  messages         : any[] = [];
  userMenuOpen     = false;
  searchOpen       = false;
  messagesOpen     = false;
  notificationOpen = false;
  private _user: any;

  constructor(
    private _userService: UserService,
    private _accountsettingservice: AccountSettingService,
    private _notificationservice: NotificationService
  ) { //console.log(this._userService.getLoggedInUser());
  }

  ngOnInit() {
    this.getUserProfile();
    this._notificationservice.getNotifications(1, 5).subscribe(resp => {
      if (resp["error"] === false) {
        this.notifications = resp["Notifications"];
      }
    }, error => {
      console.log(error);
    });
    this._notificationservice.getMessages(1, 5).subscribe(resp => {
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
    const oldCondition    = this[variable];
    this.userMenuOpen     = false;
    this.searchOpen       = false;
    this.messagesOpen     = false;
    this.notificationOpen = false;
    this[variable]        = !oldCondition;
  }

  private getUserProfile(): void {
    let user     = localStorage.getItem("user");
    let userInfo = JSON.parse(user);
    let userId   = userInfo.id;
    this._accountsettingservice.getUserProfile()
    .subscribe((response: any) => {
      this._user = response.user;
      console.log(this._user)
    }, error => {
      console.log(error);
    })
  }
}
