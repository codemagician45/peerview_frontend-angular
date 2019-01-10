import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostApiService
} from '../../services/api';
import {
  PostModel,
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  CryptoUtilities
} from '../shared/utilities';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (
    private postApiService: PostApiService,
    private route: ActivatedRoute
    ) {}

  protected posts: PostModel[] = [];
  protected user = UserService.getUser();
  private limit = 5;
  private offset = 10;
  private routeSubscriber: any;

  public ngOnInit (): void {
    this.routeSubscriber = this.route
      .queryParams
      .subscribe(params => {
        if (params.postId) {
          const postId = params.postId && parseFloat(CryptoUtilities.decipher(params.postId));
          this.getSinglePost(postId);
          return;
        }
        this.getPosts();
      });
  }

  private getPosts (): void {
    this.postApiService.promiseGetAllPost(10, 0)
    .then((responseData: PostModel[]) => {
      this.posts = responseData;
      // console.log('posts', this.posts);
    })
    .catch(error => {

    });
  }

  private getSinglePost (postId): void {
    this.postApiService.promiseGetPost(postId)
    .then((responseData: PostModel) => {
      this.posts = [responseData];
      // console.log('responseData', responseData);
    })
    .catch(error => {

    });
  }

  public loadRecord (): void {
    this.getPosts();
  }

  public ngOnDestroy (): void {
    this.routeSubscriber.unsubscribe();
  }
}
