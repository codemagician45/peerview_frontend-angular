import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from '../../../services';
import {
  PostsReponse,
  Post
} from '../../../models/models';

@Component({
  selector: 'profile-content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  constructor (private userService: UserService) {}

  protected posts: Array<Post>;

  public ngOnInit (): void {
    this.getUserTimeline();
  }

  protected onShowPostDetailDialogComponent (): void {}

  private getUserTimeline (): void {
    this.userService.getTimeline()
    .subscribe((response: PostsReponse) => {
      this.posts = response.posts;
    });
  }
}
