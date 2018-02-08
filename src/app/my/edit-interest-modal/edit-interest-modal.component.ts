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
  private interests = [];
  private interestKeyword = null;
  private timeout = null;

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

  protected searchInterests (): void {
    clearTimeout(this.timeout);

    let self = this;
    this.timeout = setTimeout(function (): void {
      if (self.interestKeyword.length !== 0) {
        self.accountSettingService.searchInterests(self.interestKeyword)
          .subscribe((response: any) => {
            self.interests = response.interests;
          });
      } else {
        self.interests = [];
      }
    }, 500);
  }

  protected addSelectedInterest (interest): void {
    let self = this;
    /* checking if the option already exists in the array,
      so the same option wont be added to the list again */
    if (!this.interestAlreadyAdded(interest, this.userInterests)) {
      this.userInterests.push(interest);

      setTimeout(function (): void {
        self.interestKeyword = null;
      }, 500);
    }
  }

  protected interestAlreadyAdded (obj, list): boolean {
    for (let i = 0; i < list.length; i++) {
      let interestID = list[i].interestId !== undefined ? list[i].interestId : list[i].id;
      if (interestID === obj.id) {
        return true;
      }
    }

    return false;
  }
}
