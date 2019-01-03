import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService,
  TokenStore,
} from '../../../../../services';
import {
  UserModel
} from '../../../models';
import {MessagesApiService} from '../../../../../services/api';

@Component({
  selector: 'navbar-mobile-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  constructor (
    private messagesApiService: MessagesApiService,

  ) {}

  protected user: UserModel = UserService.getUser();
  protected unReadMessageCount: number = 0;

  public ngOnInit (): void {}

  protected onSignOut (): void {
    TokenStore.expungeData();
    window.location.reload();
  }

  public  ngAfterViewInit (): void {
    this.messagesApiService.promiseGetUnReadMessageCount()
      .then(response => {
        if (response && response['data']) {
          this.unReadMessageCount = response['data'];
        }
      }).catch(error => {
      console.log(error);
    });
  }
}
