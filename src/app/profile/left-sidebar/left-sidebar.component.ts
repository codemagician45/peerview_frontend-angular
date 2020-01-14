import {
  Component,
  Input
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';
import {
  UserService
} from '../../../services';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { ProfileLeftSidebarUserInfoAboutMeDialogComponent } from './user-info/modal/about-me-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class ProfileLeftSidebarComponent {
  constructor (
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected user: UserModel;
  protected isUserProfile: boolean = true;
  private routeSubscriber: any;

  public ngOnInit (): void {
    let currentLoginUser = UserService.getUser();

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }

    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.mt) {
          switch (params.mt) {
            case '0':
              this.onOpenAboutMeDialog();
              break;
            default:
              break;
          }
        }
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
