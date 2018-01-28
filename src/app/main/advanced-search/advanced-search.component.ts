import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-advanced-search",
    templateUrl: "./advanced-search.component.html",
    styleUrls: ["./advanced-search.component.scss"]
})
export class AdvancedSearchComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    peopleLinkOpen(e) {
        $("#search-question, #search-keyword").hide();
        $("#search-people").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    questionLinkOpen(e) {
        $("#search-people, #search-question").hide();
        $("#search-keyword").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

}
