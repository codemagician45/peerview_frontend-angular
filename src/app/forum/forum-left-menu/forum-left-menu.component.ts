import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from "@angular/material";
import {CreateNewForumComponent} from "../modal/create-new-forum/create-new-forum.component";

@Component({
  selector: 'app-forum-left-menu',
  templateUrl: './forum-left-menu.component.html',
  styleUrls: ['./forum-left-menu.component.scss']
})
export class ForumLeftMenuComponent implements OnInit {
  @Input() page: string;
  constructor(public dialog: MatDialog) { }
  
  isCollapsed = true;
  
  ngOnInit() {
    $(window).scrollTop(0);
  }

  addNewForum() {
    this.dialog.open(CreateNewForumComponent);
  }

}
