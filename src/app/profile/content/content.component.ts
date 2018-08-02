import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserApiService
} from '../../../services/api';
import {
  PostModel
} from '../../shared/models';

@Component({
  selector: 'profile-content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  constructor (private userApiService: UserApiService) {}

  protected posts: PostModel[] = [];

  public ngOnInit (): void {
    this.getUserTimeline();
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getUserTimeline (): void {
    this.userApiService.promiseGetTimeline()
      .then((posts: PostModel[]) => {
        this.posts = posts;
      })
      .catch(error => {});
  }
}

