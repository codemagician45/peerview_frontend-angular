import {Component, OnInit} from "@angular/core";
import {AccountSettingService, UserService} from "../../../services/services"
@Component({
    selector: "app-peers-list",
    templateUrl: "peers-list.component.html",
    styleUrls: ["peers-list.component.scss"]
})
export class PeersListComponent implements OnInit {
    public peers: any[] = [];
    constructor(private _accountservice: AccountSettingService, private _userservice: UserService) {
    }

    ngOnInit() {
        this._accountservice.getpeopleyoumayknow().subscribe(resp =>{
            this.peers = resp["peersList"];
        }, error => {
            console.log("Error Retrieving People You may Know");
            console.error(error);
        })
    }

}
