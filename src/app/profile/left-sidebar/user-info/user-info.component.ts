import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Router
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
  FollowUser,
  IResponse,
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
import {MessageNotificationService, NotificationTypes, UserService} from '../../../../services';

@Component({
  selector: 'profile-left-sidebar-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class ProfileLeftSidebarUserInfoComponent {
  constructor (
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay,
    private router: Router,
    private userApiService: UserApiService
  ) {
    this.followed = this.user ? this.user.isAlreadyFollowed : false;
  }
  protected followed: boolean = false;
  private followUser: FollowUser = new FollowUser();

  @Input() protected user: UserModel;
  @Input() protected isUserProfile;
  private currentUser: UserModel = UserService.getUser();
  public ngOnInit (): void {
    this.followed = this.user ? this.user.isAlreadyFollowed : false;
  }

  protected onOpenMessageDiaglogComponent (): void {
    // this.dialog.open(ProfileLeftSidebarUserInfoMessageDiaglogComponent);
    let parentId = CryptoUtilities.cipher(this.currentUser.id);
    let userId = CryptoUtilities.cipher(this.user.id);
    let queryParams = {
      isDirectMessage: true,
      pid: parentId,
      id: userId
    };

    this.router.navigate([`/messages`], {queryParams});
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

  protected onClickFollowButton (): void {
    if (this.followed) {
      return this.onUnFollowUser();
    }

    return this.onFollowUser();
  }

  private onFollowUser (): void {
    this.followUser.recipientId = this.user.id;
    this.userApiService.promisePostFollowUser(this.followUser)
      .then((response: IResponse) => {
        this.followed = true;
      })
      .catch(error => {
        console.log('follow user', error);
        this.followErrorNotification('Follow');
      });
  }

  private onUnFollowUser (): void {
    this.userApiService.promisePostUnfollowUser(this.user.id)
      .then((response: IResponse) => {
        this.followed = false;
      })
      .catch(error => {
        console.log('follow user', error);
        this.followErrorNotification('Unfollow');
      });
  }

  private followErrorNotification (action): MessageNotificationService {
    return MessageNotificationService.show({
        notification: {
          id: 'right-sidebar-follow-message',
          message: action + ' Error',
          instruction: 'Something went wrong! Please try again.'
        }
      },
      NotificationTypes.Error);
  }
}
