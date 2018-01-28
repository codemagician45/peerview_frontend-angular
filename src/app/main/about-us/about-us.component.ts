import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "app-about-us",
    templateUrl: "./about-us.component.html",
    styleUrls: ["./about-us.component.scss"]
})
export class AboutUsComponent implements OnInit {
    navName: string = 'about-us';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.route
        .data
        .subscribe(data => {
          this.navName = data['name'];
        });
    }

}
