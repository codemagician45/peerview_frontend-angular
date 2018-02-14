import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserClass
} from '../shared/classes';
import {
  UserModel,
  Response,
  CommunityPostResponse,
  CommunityPost
} from '../shared/models';
import {
  CommunityService
} from '../../services';

@Component({
  selector: 'community-component',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  constructor (private communityService: CommunityService) {}

  protected user: UserModel = UserClass.getUser();
  protected communityPosts: Array<CommunityPost>;
  protected message: string;

  public ngOnInit (): void {
    this.getCommunityPosts();
  }

  protected communityPost (): void {
    this.communityService.post(this.message)
    .subscribe((response: Response) => {
      console.log(response);
    });
  }

  private getCommunityPosts (): void {
    this.communityService.getPosts()
    .subscribe((response: CommunityPostResponse) => {
      this.communityPosts = response.communityPosts;
      console.log(this.communityPosts);
    });
  }
}
