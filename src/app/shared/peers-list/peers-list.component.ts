import {
  Component, OnInit
} from '@angular/core';
import {
  AccountSettingService, UserService
} from '../../../services/services';

@Component({
  selector: 'app-peers-list',
  templateUrl: 'peers-list.component.html',
  styleUrls: ['peers-list.component.scss']
})
export class PeersListComponent implements OnInit {
  constructor(
    private _accountservice: AccountSettingService,
    private _userservice: UserService) {}


  public peers: any[] = [];
  private profilePicture: string = '../../../assets/images/{{peer.profilePicture}}';

  ngOnInit() {
    this._accountservice.getpeopleyoumayknow().subscribe(response => {
      console.log(response);
    }, error => {
      console.log("Error Retrieving People You may Know");
      console.error(error);
    })
  }

}
