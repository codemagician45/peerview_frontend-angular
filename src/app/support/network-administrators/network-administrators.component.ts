import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-network-administrators",
    templateUrl: "./network-administrators.component.html",
    styleUrls: ["./network-administrators.component.scss"]
})
export class NetworkAdministratorsComponent implements OnInit {

    public header = "Network Administrators for the Campus";
    public sub_header = "";

    constructor() {
    }

    ngOnInit() {
    }

}
