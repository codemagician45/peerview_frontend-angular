import {
  Component
} from '@angular/core';
import {
  UserModel
} from '../../models';
import {
  UserApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-peers-you-may-know-component',
  templateUrl: './peers-you-may-know.component.html',
  styleUrls: ['./peers-you-may-know.component.scss']
})
export class SharedPeersYouMayKnowComponent {
  constructor (
    private userApiService: UserApiService
  ) {}

  public peers: any[];
  public user: any;

  public ngOnInit (): void {
    this.userApiService.promiseGetPeersList()
      .then((users: UserModel[]) => {
        this.peers = users;
        console.log(this.peers);
      })
      .catch(() => {});
  }
}
