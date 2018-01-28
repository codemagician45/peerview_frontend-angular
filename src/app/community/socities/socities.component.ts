import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-socities",
    templateUrl: "./socities.component.html",
    styleUrls: ["./socities.component.scss"]
})
export class SocitiesComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }

    postLink(e) {
        $(".create-poll, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-post, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    };

    pollLink(e) {
        $(".create-post, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-poll, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    };

}
