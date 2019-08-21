/**
 * This would be social icons inside a component
 */
import {
  Component, Input
} from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { AddSocialLinksDialogComponent } from './add-social-link-modal/add-social-link-modal.component';
import { UserModel } from '../../models';

@Component({
  selector: 'shared-social-component',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SharedSocialComponent {

  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {
    // console.log(this.user);
  }

  @Input() protected user: UserModel;
  @Input() protected isUserProfile;

  public ngOnInit (): void {
    console.log(this.user);
  }

  private showAddSocialLinkModal (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-social-link-modal';
    dialogConfig.id = 'ProfileAddSocialLinkModalComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      user: this.user
    };
    this.dialog.open(AddSocialLinksDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (!data) { return; }
      this.user.facebook_profile = data.facebook_profile;
      this.user.twitter_profile = data.twitter_profile;
      this.user.instagram_profile = data.instagram_profile;
      this.user.snapchat_profile = data.snapchat_profile;
    });
  }
}
