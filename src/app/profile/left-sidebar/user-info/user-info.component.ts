import {
  Component
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  MatDialog
} from '@angular/material';
import {
  UserModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserClass
} from '../../../shared/classes';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  ProfileLeftSidebarUserInfoMessageDiaglogComponent
} from './message/message.component';
import {
  ProfileLeftSidebarUserInfoPostToDiaglogComponent
} from './post-to/post-to.component';
import {
  ProfileLeftSidebarUserInfoAboutMeDialogComponent
} from './modal/about-me-modal.component';

@Component({
  selector: 'profile-left-sidebar-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class ProfileLeftSidebarUserInfoComponent {
  constructor (
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      if (this.userId) { this.userId = CryptoUtilities.decipher(this.userId); }
    });
  }

  protected userId: string;
  protected user = UserClass.getUser();

  public ngOnInit (): void {}

  protected onOpenMessageDiaglogComponent (): void {
    this.dialog.open(ProfileLeftSidebarUserInfoMessageDiaglogComponent);
  }

  protected onOpenPostToDiaglogComponent (): void {
    this.dialog.open(ProfileLeftSidebarUserInfoPostToDiaglogComponent, {
      data: this.user
    });
  }

  protected onOpenAboutMeDialog (): void {
    this.dialog.open(ProfileLeftSidebarUserInfoAboutMeDialogComponent, {
      id: 'ProfileLeftSidebarUserInfoAboutMeDialogComponent',
      data: this.user.aboutMe
    })
    .afterClosed()
    .subscribe(aboutMe => {
      if (!aboutMe) { return; }
      this.user.aboutMe = aboutMe;
    });
  }
}
