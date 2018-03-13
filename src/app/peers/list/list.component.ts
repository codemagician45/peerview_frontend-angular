import {
  Component, OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  PeersService
} from '../../../services/peers.service';
import {
  PeersListResponse,
  UserModel
} from  '../../../models/models';
import {
  CryptoUtilities
} from '../../shared/utilities';

@Component({
  selector: 'peers-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PeersListComponent implements OnInit {
  constructor (
    private peersService: PeersService,
    private router: Router
  ) {}

  protected peersList: Array<UserModel>;
  private cryptoUtilities = new CryptoUtilities();

  public ngOnInit (): void {
    this.peersService.list()
    .subscribe((response: PeersListResponse) => {
      console.log('response');
      console.log(response);
      this.peersList = response.peersList;
    }, error => {
      console.log('Error Retrieving People You may Know');
      console.error(error);
    });
  }

  protected onClickUser (user): void {
    let userId = this.cryptoUtilities.cipher(user.id);
    this.router.navigate([`/profile/${userId}`]);
  }
}
