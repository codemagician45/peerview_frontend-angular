import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material";
import {CreateNewForumComponent} from "../modal/create-new-forum/create-new-forum.component";

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent implements OnInit {
  public peers: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    const that = this;
    this.http.get("https://randomuser.me/api/?results=15").subscribe(data => {
      that.peers = data["results"];
      that.peers.map(function (item, index) {
        if (index >= 10) {
          item.hidden = 1;
        }
      });
    });
  }

  visibilityToggle() {
    this.peers.map(function (item, index) {
      if (index >= 10) {
        item.hidden = !item.hidden;
      }
    });
  }


  postLink(e) {
    $(".create-poll, .brain-map, .ask-question, .share-story, .guest-list").hide();
    $(".create-post, .timeline-block").fadeIn();
    $(".post-action li").removeClass("active");
    $(e.target).closest("li").addClass("active");
  }

  brainLink(e) {
    $(".create-post, .create-poll, .timeline-block, .ask-question").hide();
    $(".brain-map").fadeIn();
    $(".post-action li").removeClass("active");
    $(e.target).closest("li").addClass("active");
  }

  pollLink(e) {
    $(".create-post, .brain-map, .ask-question, .share-story, .guest-list").hide();
    $(".create-poll, .timeline-block").fadeIn();
    $(".post-action li").removeClass("active");
    $(e.target).closest("li").addClass("active");
  }

  addNewForum() {
    this.dialog.open(CreateNewForumComponent);
  }
}
