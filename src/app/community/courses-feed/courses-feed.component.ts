import {Component, OnInit} from "@angular/core";
import {PostDetailComponent} from "../../shared/modal/components/PostDetailComponent";
import {MatDialog} from "@angular/material";
import {CampusService} from "../../../services/services"

@Component({
    selector: "app-courses-feed",
    templateUrl: "./courses-feed.component.html",
    styleUrls: ["./courses-feed.component.scss"]
})
export class CoursesFeedComponent implements OnInit {

    freshersfeedposts = [];
    constructor(public dialog: MatDialog, private postservice: CampusService) {
    }

    ngOnInit() {
        this.postservice.getfreshersfeedpost().subscribe(resp =>{
            this.freshersfeedposts = resp["campusPosts"];
        })

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
    }

    pollLink(e) {
        $(".create-post, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-poll, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    openPostDetail() {
        this.dialog.open(PostDetailComponent);
    }

}
