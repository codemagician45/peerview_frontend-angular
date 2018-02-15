import {
  Component
} from '@angular/core';
import {
  PeersListResponse
} from '../../models';
import {
  UserService
} from '../../../../services';

@Component({
  selector: 'shared-peers-you-may-know-component',
  templateUrl: './peers-you-may-know.component.html',
  styleUrls: ['./peers-you-may-know.component.scss']
})
export class SharedPeersYouMayKnowComponent {
  constructor (
    private userService: UserService
  ) {}

  public peers: any[];
  public user: any;

  public ngOnInit (): void {
    this.userService.getPeerslist()
    .subscribe((response: PeersListResponse) => {
      this.peers = response.peersList;
    }, error => {
      console.log(error);
    });
  }
}
