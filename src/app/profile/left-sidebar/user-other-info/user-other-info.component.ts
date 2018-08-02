import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UserModel
} from '../../../shared/models';
import {
  UserClass
} from '../../../shared/classes';
import {
  UserApiService
} from '../../../../services/api';
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
    private userApiService: UserApiService
  ) {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      if (this.userId) { this.userId = CryptoUtilities.decipher(this.userId); }
    });
  }

  protected user: UserModel = UserClass.getUser();
  private userId: string;

  public ngOnInit (): void {}
}
