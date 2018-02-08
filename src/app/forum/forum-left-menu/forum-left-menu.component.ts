import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  CreateNewForumComponent
} from '../modal/create-new-forum/create-new-forum.component';

@Component({
  selector: 'app-forum-left-menu',
  templateUrl: './forum-left-menu.component.html',
  styleUrls: ['./forum-left-menu.component.scss']
})
export class ForumLeftMenuComponent implements OnInit {
  constructor (public dialog: MatDialog) {}

  @Input() protected page: string;
  protected isCollapsed = true;

  public ngOnInit (): void {
    $(window).scrollTop(0);
  }

  protected addNewForum (): void {
    this.dialog.open(CreateNewForumComponent);
  }
}
