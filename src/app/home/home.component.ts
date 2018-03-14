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
  UserModel,
  PostResponse
} from '../shared/models';
import {
  UserClass
} from '../shared/classes';
import {
  EmitterService
} from '../shared/emitter/emitter.component';
import {
  PostEmitter
} from '../shared/emitter';

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
  private postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private limit = 5;
  private offset = 10;
  private hasAddedPostCounter = 0;

  public ngOnInit (): void {
    this.getPosts();
    this.postSavedSubcriber();
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

  /*Subscribe on postSaveEmitter in order to refresh post list after posting new*/
  private postSavedSubcriber (): void {
    PostEmitter
    .postSave()
    .subscribe(response => {
      this.postService.getPost(response)
      .subscribe((data: PostResponse) => {
        this.posts.unshift(data.post);
        this.hasAddedPostCounter += 1;
        console.log(this.posts);
      });
    });
  }

  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getPostSaveName());
  }
}
