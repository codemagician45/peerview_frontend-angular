import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: "app-peers-online",
    templateUrl: "./peers-online.component.html",
    styleUrls: ["./peers-online.component.scss"]
})
export class PeersOnlineComponent implements OnInit {

    public peers: any;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        const that = this;
        this.http.get("https://randomuser.me/api/?results=15").subscribe(data => {
            that.peers = data["results"];
            that.peers.map(function (item, index) {
                if (index >= 10) {
                    item.hidden = 1;
                }
            });
        });
    }

    visibilityToggle() {
        this.peers.map(function (item, index) {
            if (index >= 10) {
                item.hidden = !item.hidden;
            }
        });
    }

}
