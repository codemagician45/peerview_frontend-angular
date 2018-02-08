import {
  Component,
  OnInit
} from '@angular/core';
import {
  OpenJoinComponent
} from '../shared/modals/components/OpenJoinComponent';
import {
  OpenInviteComponent
} from '../shared/modals/components/OpenInviteComponent';
import {
  MatDialog
} from '@angular/material';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  constructor (private dialog: MatDialog) {}

  public ngOnInit (): void {}

  protected openJoin (): void {
    this.dialog.open(OpenJoinComponent);
  }

  protected openInvite (): void {
    this.dialog.open(OpenInviteComponent);
  }
}
