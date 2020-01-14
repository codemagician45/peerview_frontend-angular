import {
  Component
} from '@angular/core';
import {
  UserModel,
  IResponse,
  FollowUser
} from '../../models';
import {
  UserApiService
} from '../../../../services/api';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-peers-you-may-know-component',
  templateUrl: './peers-you-may-know.component.html',
  styleUrls: ['./peers-you-may-know.component.scss']
})
export class SharedPeersYouMayKnowComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router
  ) {}

  public peers: any[];
  public user: any;
  private followUser: FollowUser = new FollowUser();

  public ngOnInit (): void {
   this.getPeersList();
  }

  protected onFollowUser (id): void {
    this.followUser.recipientId = id;
    this.userApiService.promisePostFollowUser(this.followUser)
    .then((response: IResponse) => {
      this.getPeersList();
      this.followUser.recipientId = 0;
    })
    .catch(() => {
      this.followUser.recipientId = 0;
      return MessageNotificationService.show({
        notification: {
          id: 'peers-you-may-know-error-message',
          message: 'Follow Error',
          instruction: 'Something went wrong! Please try again.'
        }
      },
      NotificationTypes.Error);
    });
  }

  protected removePeer (peer): void {
    let index = this.peers.indexOf(peer);
    if (index > -1) {
      this.peers.splice(index, 1);
    }
  }

  private getPeersList (): void {
    this.userApiService.promiseGetPeersList()
    .then((users: UserModel[]) => {
      const usersThatAreNotYetFollowed = users.filter(item => item.isUserAlreadyFollowed === false);
      this.peers = usersThatAreNotYetFollowed;
    })
    .catch(() => {});
  }

  protected onClickUser (user): void {
    let userId = CryptoUtilities.cipher(user.id);
    this.router.navigate([`/profile/${userId}`]);
  }
}
