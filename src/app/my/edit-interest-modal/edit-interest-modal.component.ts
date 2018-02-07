import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  AccountSettingService
} from '../../../services/accountsetting.service';

@Component({
  selector: 'app-edit-interest-modal',
  templateUrl: './edit-interest-modal.component.html',
  styleUrls: ['./edit-interest-modal.component.css']
})
export class EditInterestModalComponent implements OnInit {
  constructor (
    private dialog: MatDialog,
    private accountSettingService: AccountSettingService
  ) {}

  private userInterests: Array<string>;

  public ngOnInit (): void {
    this.accountSettingService.getUserInterests()
      .subscribe((response: any) => {
        this.userInterests = response.interests;
      });
  }

  protected onClose (): void {
    this.dialog.closeAll();
  }

  protected onDelete (interest): void {
    this.accountSettingService.removeUserInterest(interest.id)
      .subscribe(() => {
        let position = this.userInterests.indexOf(interest);
        this.userInterests.splice(position, 1);
      });
  }

  protected update (): void {
    console.log('Update Interests Commencing');
  }
}
