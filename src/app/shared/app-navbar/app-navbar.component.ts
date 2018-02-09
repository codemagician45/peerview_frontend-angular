import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  UserService,
  NotificationService,
  AccountSettingService
} from '../../../services/services';
import {
  NewMessageModalComponent
} from '../new-message-modal/new-message-modal.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavBarComponent implements OnInit {
  constructor (
    private _userService: UserService,
    private _accountsettingservice: AccountSettingService,
    private _notificationservice: NotificationService
  ) {}

  @Input('active') protected active: string;
  private notifications: any[] = [];
  private messages: any[] = [];
  private userMenuOpen = false;
  private searchOpen = false;
  private messagesOpen = false;
  private notificationOpen = false;
  private user: any;

  public ngOnInit (): void {
    this.getUserProfile();
    this._notificationservice.getNotifications(1, 5).subscribe(resp => {
      if (resp['error'] === false) {
        this.notifications = resp['Notifications'];
      }
    }, error => {
      console.log(error);
    });
    this._notificationservice.getMessages(1, 5).subscribe(resp => {
      if (resp['error'] === false) {
        this.messages = resp['Messages'];
      }
    }, error => {
      console.log(error);
    });
    $('body')
      .removeClass('_bg_white')
      .addClass('_bg_gray');
  }

  public openRightMenu (variable): void {
    const oldCondition = this[variable];
    this.userMenuOpen = false;
    this.searchOpen = false;
    this.messagesOpen = false;
    this.notificationOpen = false;
    this[variable] = !oldCondition;
  }

  private getUserProfile (): void {
    let user = localStorage.getItem('user');
    let userInfo = JSON.parse(user);
    let userId = userInfo.id;
    this._accountsettingservice.getUserProfile()
      .subscribe((response: any) => {
        this.user = response.user;
        console.log(this.user);
      }, error => {
        console.log(error);
      });
  }
}
