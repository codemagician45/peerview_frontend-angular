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

@Component({
  selector: 'community-component',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  constructor () {}

  protected user: UserModel = UserClass.getUser();
  protected communityPosts: Array<CommunityPost>;
  protected message: string;

  public ngOnInit (): void {}
}
