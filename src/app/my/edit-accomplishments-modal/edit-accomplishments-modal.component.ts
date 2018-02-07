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
  AccountSettingService
} from '../../../services/accountsetting.service';

@Component({
  selector: 'app-edit-accomplishments-modal',
  templateUrl: './edit-accomplishments-modal.component.html',
  styleUrls: ['./edit-accomplishments-modal.component.css']
})
export class EditAccomplishmentsModalComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private accountSettingService: AccountSettingService
  ) {}

  private user = this.data;
  private userAccomplishments: string;

  public ngOnInit (): void {}

  protected onChangeAccomplishments (value): void {
    this.userAccomplishments = value;
  }

  protected onClose (): void {
    this.dialog.closeAll();
  }

  protected onAddOrUpdate (): void {
    if (this.user.accomplishments === this.userAccomplishments || !this.userAccomplishments) { return; }
    this.accountSettingService.updateUserAccomplishments(this.userAccomplishments)
      .subscribe(() => {
        let editAccomplishmentsModalComponent = this.dialog.getDialogById('EditAccomplishmentsModalComponent');
        editAccomplishmentsModalComponent.close(this.userAccomplishments);
      });
  }
}
