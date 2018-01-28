import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from "@angular/material";
import {PostDetailComponent} from "../modal/components/PostDetailComponent";
import * as Ps from 'perfect-scrollbar';
import {ShareModalComponent} from "../share-modal/share-modal.component";
import {ReportModalComponent} from "../report-modal/report-modal.component";
import {UserService, PostService} from "../../../services/services";
import { LikePost } from '../../../models/models';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  @Input() likes = 0;
  @Input() replies = 0;
  @Input() views = 0;
  @Input() share = 0;
  @Input() post : any;
  @Input('reply-link') replyLink = '';
  public user :any;

  constructor(
    public dialog: MatDialog,
    private _userservice: UserService,
    private _postservice: PostService
  ) { }

  ngOnInit() {
    this.user = this._userservice.getLoggedInUser();
    this.post = this.post || {};
  }

  openPostDetail() {
    if (this.replyLink) {
      return
    }
    this.dialog.open(PostDetailComponent);
    setTimeout(()=>{
      // const container = document.querySelector('.mat-dialog-container');
      const container = $('.mat-dialog-container')[0];
      //Ps.initialize(container);
    }, 200)
  }

  openShare() {
    this.dialog.open(ShareModalComponent);
  }

  report() {
    this.dialog.open(ReportModalComponent)
  }

  likepost() {
    this._postservice.likepost(this.post.id, new LikePost()).subscribe(resp =>{
      console.log(resp);
      if(resp["error"] === false) {
        alert(resp["Message"]);
      }
    }, error => {
      console.error("Error Liking Post");
      console.error(error);
    })
  }

}
