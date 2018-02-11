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
  constructor (
    private accountservice: AccountSettingService,
    private userservice: UserService
  ) {}

  public peers: any[] = [];
  private profilePicture: string = '../../../assets/images/{{peer.profilePicture}}';

  public ngOnInit (): void {
    this.accountservice.getpeopleyoumayknow().subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Error Retrieving People You may Know');
      console.error(error);
    });
  }
}
