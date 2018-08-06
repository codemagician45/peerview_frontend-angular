import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  UserModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
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
import {
  SharedImagePreviewComponent
} from '../../../shared/modals/image-preview/image-preview.component';

@Component({
  selector: 'profile-left-sidebar-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class ProfileLeftSidebarUserInfoComponent {
  constructor (
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected user: UserModel;
  @Input() protected isUserProfile;

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

  protected onOpenShowImageDialogComponent (user): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: user.socialImage
        ? (user.profilePicture === 'avatar' ? user.socialImage : user.profilePicture)
        : user.profilePicture,
      source: 'profile-picture'
    };
    this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}
