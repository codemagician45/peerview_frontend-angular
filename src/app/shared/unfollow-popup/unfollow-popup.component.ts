import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {AccountSettingService} from "../../../services/services"

@Component({
  selector: 'app-unfollow-popup',
  templateUrl: './unfollow-popup.component.html',
  styleUrls: ['./unfollow-popup.component.scss']
})
export class UnfollowPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private accountservice: AccountSettingService) { }

  ngOnInit() {
  }

  unfollowuser(userid) {
    this.accountservice.unfollowuser(userid).subscribe(resp => {
        alert(`${this.data.name} unfollowed`);
    });
  }
}
