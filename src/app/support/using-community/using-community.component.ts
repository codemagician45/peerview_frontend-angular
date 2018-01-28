import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-using-community",
    templateUrl: "./using-community.component.html",
    styleUrls: ["./using-community.component.scss"]
})
export class UsingCommunityComponent implements OnInit {

    public header = "Using the Online Campus";
    public sub_header = "";

    constructor() {
    }

    ngOnInit() {
    }

}
