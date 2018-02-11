import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommunityService
} from '../../../services/services';
import {
  MatDialog
} from '@angular/material';
import {
  ShareModalComponent
} from '../../shared/share-modal/share-modal.component';
import {
  CreateClubPageComponent
} from '../../shared/create-club-page/create-club-page.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit {
  constructor (
    private communityService: CommunityService,
    public dialog: MatDialog
  ) {}

  protected clubs: any[] = [];

  public ngOnInit (): void {
    this.communityService.getuserclubs().subscribe((response: any) => {
      this.clubs = response.campusSocietyClubs;
    }, error => {
      console.log(error);
    });
  }

  protected unfollowclub (clubid: number): void {
    this.communityService.unfollowclub(clubid).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  public createClubPage (): void {
    this.dialog.open(CreateClubPageComponent);
  }
}
