import {
  Component
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
  UserModel,
  // UserResponse
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
    // private userService: UserService,
    private dialog: MatDialog,
    private overlay: Overlay
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

  protected onOpenShowImageDialogComponent (user): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { image: user.socialImage, source: 'profile-picture' };
    this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}
