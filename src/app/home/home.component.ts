import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostService
} from '../../services';
import {
  PostsResponse,
  PostModel,
  UserModel
} from '../shared/models';
import {
  UserClass
} from '../shared/classes';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (private postService: PostService) {}

  protected posts: Array<PostModel>;
  protected emailOfPeerToInvite: string;
  protected user: UserModel = UserClass.getUser();

  public ngOnInit (): void {
    this.getPosts();
  }

  private getPosts (): void {
    this.postService.getPosts(10, 0)
    .subscribe((response: PostsResponse) => {
      this.posts = response.posts;
      console.log(this.posts);
      if (this.posts.length <= 0) {
        // this.isDisabled = true;
        // this.btnLoadMoreText = 'No More Posts To Show';
      }
    }, error => {
      // alert('Error Retrieving All Posts');
    });
  }
}
