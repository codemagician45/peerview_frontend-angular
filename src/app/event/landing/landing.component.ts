import {Component, OnInit} from "@angular/core";
import * as $ from "jquery";
import {Router} from "@angular/router";

import {CourseService} from "../../../services/services";
import * as _ from "lodash";

@Component({
    selector: "app-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {

    constructor(public router: Router, private _courseservice: CourseService) {
    }
    canadiancities: any[] = [];
    expanded: false;
    ngOnInit() {

        if ($(window).width() > 1025) {

            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "66px"});
        }
        this._courseservice.getCountryCities().subscribe(resp => {
            this.canadiancities = _.orderBy(resp["cities"], ["name"], ["asc"]);
          })
    }

    moreCities() {
        const txt = $(".more-city").is(":visible") ? "View More Cities" : "Hide Cities";
        $(".cities-btn").text(txt);
        $(".more-city").toggle();
    }

    toEvent(id: number) {
        this.router.navigateByUrl(`/events/home?id=${id}`);
    }

}
