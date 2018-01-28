import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }

    addKeyword(e) {
        console.log(e);
        $(e.target).hide();
        $(e.target).parent().next("div").addClass("active");
    }

    postLink(e) {
        $(".create-poll, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-post, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    pollLink(e) {
        $(".create-post, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-poll, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    questionLink(e) {
        $(".create-post, .brain-map, .create-poll, .timeline-block").hide();
        $(".ask-question, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    brainLink(e) {
        $(".create-post, .create-poll, .timeline-block, .ask-question").hide();
        $(".brain-map").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

}
