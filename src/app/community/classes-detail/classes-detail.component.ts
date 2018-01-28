import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-classes-detail",
    templateUrl: "./classes-detail.component.html",
    styleUrls: ["./classes-detail.component.scss"]
})
export class ClassesDetailComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() > 1025) {

            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }


}
