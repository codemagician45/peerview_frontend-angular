import {Component, OnInit} from "@angular/core";

import {ForumService} from "../../../services/services";

@Component({
    selector: "app-top-questions",
    templateUrl: "./top-questions.component.html",
    styleUrls: ["./top-questions.component.scss"]
})
export class TopQuestionsComponent implements OnInit {

    constructor(private _forumservice: ForumService) {
    }
    allquestions: any[] = [];
    ngOnInit() {
        this._forumservice.getPopularQuestions().subscribe(resp => {
            //console.log(resp);
            if (resp["error"] === false) {
                this.allquestions = this._forumservice.parseForum(resp["questions"]);
            }
        }, error => {
            console.log(error);
        });
    }

}
