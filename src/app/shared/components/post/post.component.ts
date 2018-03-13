import {
  Component,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  PostModel,
  PostResponse,
} from '../../models';
import {
  PostService,
} from '../../../../services';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
  selector: 'shared-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class SharedPostComponent {
  constructor (
    private postService: PostService,
    private router: Router
  ) {}

  @Input() protected posts: Array<PostModel>;
  private sharePostSuccessSubscriber = EmitterService.get('sharePostEmitter');
  private postSavedSubscriber = EmitterService.get('postSaveEmitter');
  private hasAddedPostCounter = 0;
  private cryptoUtilities = new CryptoUtilities();

  public ngOnInit (): void {
    this.postSavedSubcriber();
    this.getSharedPostSubscriber();
  }

  private postSavedSubcriber (): void {
    this.postSavedSubscriber
    .subscribe(response => {
      this.postService.getPost(response)
      .subscribe((data: PostResponse) => {
        this.posts.unshift(data.post);
        this.hasAddedPostCounter += 1;
      });
    });
  }

  private getSharedPostSubscriber (): void {
    this.sharePostSuccessSubscriber
    .subscribe(data => {
      this.postService.getPost(data.postId)
      .subscribe((response: PostResponse) => {
        this.posts.unshift(response.post);
      }, error => {
        console.log(error);
      });
    });
  }

  protected onClickUserProfile (user): void {
    let userId = this.cryptoUtilities.cipher(user.id);
    this.router.navigate([`/profile/${userId}`]);
  }
}
