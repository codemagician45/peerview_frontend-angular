import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccountSettingService, UserService} from "../../../services/services";

@Component({
    selector: "app-peers-may-know",
    templateUrl: "./peers-may-know.component.html",
    styleUrls: ["./peers-may-know.component.scss"]
})
export class PeersMayKnowComponent implements OnInit {

    public peers: any[];
    
    constructor(private http: HttpClient, private _accountsettingservice: AccountSettingService, private _userservice: UserService) {
    }
    public user = this._userservice.getLoggedInUser();
    ngOnInit() {
        this._accountsettingservice.getpeopleyoumayknow().subscribe(resp=> {
                this.peers = resp["peersList"];
        }, error => {
            console.log(error);
        });
    }

    removepeer(peer: any) {
        var index = this.peers.indexOf(peer, 0);
        if (index > -1) {
           this.peers.splice(index, 1);
        }
    }

}
