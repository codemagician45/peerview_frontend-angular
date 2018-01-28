import {Component, OnInit} from "@angular/core";
// import {OpenJoinComponent} from "../../shared/modals/components/OpenJoinComponent";
import {CreateNewForumComponent} from "../modal/create-new-forum/create-new-forum.component";

import {CourseService} from "../../../services/services";
import * as _ from "lodash";
import {MatDialog} from "@angular/material";
import {UnfollowPopupComponent} from "../../shared/unfollow-popup/unfollow-popup.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    public showSelect = false;
    public levelEditMode = false;
    constructor(
      private _courseservice: CourseService,
      public dialog: MatDialog
    ) {
    }
    courses: any[] = [];
    courselevel: any[] = [];
    ngOnInit() {
        this._courseservice.getCourses().subscribe((resp) => {
            this.courses = _.orderBy(resp["courses"], ["course"], ["asc"]);
        });
        this._courseservice.getLevelOfStudy().subscribe(resp =>{
            this.courselevel = resp["userStudyLevel"];
        })

        $(".tabChange").click(function (e) {
            e.preventDefault();
            const that = $(this);
            const panel = that.data("tab-name");
            $("#post-tab ul li").removeClass("active");
            $(".tab-pane").removeClass("active").removeClass("in");
            $("#" + panel).addClass("active").addClass("in");
            that.parent().addClass("active");
            return false;
        });
    }

    addNewForum() {
      this.dialog.open(CreateNewForumComponent);
    }

    addKeyword(e) {
      console.log(e);
      $(e.target).hide();
      $(e.target).parent().next("div").addClass("active");
    }

    follow($event) {
      const button = $($event.currentTarget);
      const buttonText = $($event.currentTarget).find('.btn-text');

      const isFollowing = button.hasClass('following');

      if (isFollowing) {
        button.removeClass('btn-primary');
        button.removeClass('following');
        button.addClass('btn-blue');
        buttonText.text('Follow');
        this.dialog.open(UnfollowPopupComponent, {
          data: {
            name: 'Post'
          },
        });
      } else {
        button.removeClass('btn-blue');
        button.addClass('btn-primary');
        button.addClass('following');
        buttonText.text('Following');
      }
    }

}
