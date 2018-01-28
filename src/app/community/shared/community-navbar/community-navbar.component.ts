import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "app-community-navbar",
    templateUrl: "./community-navbar.component.html",
    styleUrls: ["./community-navbar.component.scss"]
})
export class CommunityNavbarComponent implements OnInit {

    @Input("active") protected active: string;

    public dropDownOpen;

    constructor() {
    }

    ngOnInit() {
      $(window).scrollTop(0);
    }

    toggle(e) {
        e.preventDefault();
        this.dropDownOpen = !this.dropDownOpen;
        return false;
    }

}
