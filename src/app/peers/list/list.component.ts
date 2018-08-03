import {
  Component, OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserApiService
} from '../../../services/api';
import {
  UserModel
} from  '../../shared/models';
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
    private userApiService: UserApiService,
    private router: Router
  ) {}

  protected peersList: Array<UserModel>;

  public ngOnInit (): void {
    this.userApiService.promiseGetPeersList()
      .then((peersList: UserModel[]) => {
        this.peersList = peersList;
      })
      .catch(error => {});
  }

  protected onClickUser (user): void {
    let userId = CryptoUtilities.cipher(user.id);
    this.router.navigate([`/profile/${userId}`]);
  }
}
