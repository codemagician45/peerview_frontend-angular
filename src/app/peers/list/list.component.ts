import {
  Component, OnInit
} from '@angular/core';
import {
  PeersService
} from '../../../services/peers.service';
import {
  PeersListResponse,
  UserModel
} from  '../../../models/models';

@Component({
  selector: 'peers-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PeersListComponent implements OnInit {
  constructor (
    private peersService: PeersService
  ) {}

  protected peersList: Array<UserModel>;

  public ngOnInit (): void {
    this.peersService.list()
    .subscribe((response: PeersListResponse) => {
      this.peersList = response.peersList;
    }, error => {
      console.log('Error Retrieving People You may Know');
      console.error(error);
    });
  }
}
