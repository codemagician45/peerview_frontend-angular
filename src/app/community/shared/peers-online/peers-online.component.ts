import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-peers-online',
  templateUrl: './peers-online.component.html',
  styleUrls: ['./peers-online.component.scss']
})
export class PeersOnlineComponent implements OnInit {
  constructor (private http: HttpClient) {}

  public peers: any;

  public ngOnInit (): void {
    const that = this;
    this.http.get('https://randomuser.me/api/?results=15').subscribe(data => {
      that.peers = data['results'];
      that.peers.map(function (item, index): void {
        if (index >= 10) {
          item.hidden = 1;
        }
      });
    });
  }

  protected visibilityToggle (): void {
    this.peers.map(function (item, index): void {
      if (index >= 10) {
        item.hidden = !item.hidden;
      }
    });
  }
}
