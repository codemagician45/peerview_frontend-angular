import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {AccountSettingService} from '../../../services/accountsetting.service';

@Component({
  selector: 'app-about-me-modal',
  templateUrl: './about-me-modal.component.html',
  styleUrls: ['./about-me-modal.component.scss']
})
export class AboutMeModalComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private accountSettingService: AccountSettingService
  ) {}

  private aboutMe: string;

  ngOnInit() {}

  onCancel() {
    this.dialog.closeAll();
  }

  onSave() {
    if (this.aboutMe) {
      this.accountSettingService.updateAboutMe(this.aboutMe)
      .subscribe((user: any) => {
        let aboutModelComponentRef = this.dialog.getDialogById('AboutMeModalComponent');
        aboutModelComponentRef.close(this.aboutMe);
      });
    }
  }
}
