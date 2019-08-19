/**
 * This would be social icons inside a component
 */
import {
  Component
} from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { AddSocialLinksDialogComponent } from './add-social-link-modal/add-social-link-modal.component';

@Component({
  selector: 'shared-social-component',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SharedSocialComponent {
  constructor (
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  private showAddSocialLinkModal (): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'add-social-link-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: 'test',
      source: 'profile-picture'
    };
    this.dialog.open(AddSocialLinksDialogComponent, dialogConfig);
  }
}
