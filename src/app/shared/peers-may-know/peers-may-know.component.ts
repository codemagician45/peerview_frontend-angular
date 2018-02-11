import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AccountSettingService,
  UserService
} from '../../../services/services';

@Component({
  selector: 'app-peers-may-know',
  templateUrl: './peers-may-know.component.html',
  styleUrls: ['./peers-may-know.component.scss']
})
export class PeersMayKnowComponent implements OnInit {
  constructor (
    private http: HttpClient,
    private accountsettingservice: AccountSettingService,
    private userservice: UserService
  ) {}

  public peers: any[];
  public user = this.userservice.getLoggedInUser();

  public ngOnInit (): void {
    this.accountsettingservice.getpeopleyoumayknow().subscribe(resp => {
      this.peers = resp['peersList'];
    }, error => {
      console.log(error);
    });
  }

  protected removepeer (peer: any): void {
    let index = this.peers.indexOf(peer, 0);
    if (index > -1) {
      this.peers.splice(index, 1);
    }
  }
}
