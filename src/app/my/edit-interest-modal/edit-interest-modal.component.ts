import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {AccountSettingService} from '../../../services/accountsetting.service';

@Component({
  selector: 'app-edit-interest-modal',
  templateUrl: './edit-interest-modal.component.html',
  styleUrls: ['./edit-interest-modal.component.css']
})
export class EditInterestModalComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private accountSettingService: AccountSettingService
  ) {}

  private userInterests: Array<string>;

  ngOnInit() {
    // Call here the service
    this.accountSettingService.getUserInterests()
    .subscribe((response: any) => {
      this.userInterests = response.interests;
    });
  }

  onClose() {
   this.dialog.closeAll();
  }

  onDelete(interest) {
    this.accountSettingService.removeUserInterest(interest.id)
    .subscribe(() => {
      let position = this.userInterests.indexOf(interest);
      this.userInterests.splice(position, 1);
    });
  }

  update() {
    console.log("Update Interests Commencing");
  }
}
