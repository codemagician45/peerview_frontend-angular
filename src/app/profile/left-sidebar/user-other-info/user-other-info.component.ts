import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UserModel,
  UserResponse
} from '../../../shared/models';
import {
  UserClass
} from '../../../shared/classes';
import {
  UserService
} from '../../../../services';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
  selector: 'profile-left-sidebar-user-other-info-component',
  templateUrl: './user-other-info.component.html',
  styleUrls: ['./user-other-info.component.scss']
})
export class ProfileLeftSidebarUserOtherInfoComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      if (this.userId) { this.userId = this.cryptoUtilities.decipher(this.userId); }
    });
  }

  protected user: UserModel;
  private userId: string;
  private cryptoUtilities = new CryptoUtilities();

  public ngOnInit (): void {
    this.userId && this.userService.getProfile(this.userId)
    .subscribe((response: UserResponse) => {
      this.user = response.user;
    });

    !this.userId && (this.user = UserClass.getUser());
  }
}
