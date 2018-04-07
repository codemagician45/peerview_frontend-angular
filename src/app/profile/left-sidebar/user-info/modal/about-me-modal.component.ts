import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  UserService
} from '../../../../../services';

@Component({
  selector: 'app-about-me-modal',
  templateUrl: './about-me-modal.component.html',
  styleUrls: ['./about-me-modal.component.scss']
})
export class ProfileLeftSidebarUserInfoAboutMeDialogComponent implements OnInit {
  constructor (
    @Inject (MAT_DIALOG_DATA)
    private aboutMe: string,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.aboutMe);
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    if (this.aboutMe) {
      this.userService.updateAboutMe(this.aboutMe)
      .subscribe((user: any) => {
        let aboutModelComponentRef = this.dialog.getDialogById('ProfileLeftSidebarUserInfoAboutMeDialogComponent');
        aboutModelComponentRef.close(this.aboutMe);
      });
    }
  }
}
