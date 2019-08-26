import {
  Component,
  OnDestroy,
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
import {NgxLinkifyjsService, Link} from 'ngx-linkifyjs';
import {PostEmitter} from '../shared/emitter';

@Component({
  selector: 'create-ad-component',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit, OnDestroy {
  constructor (
    private postApiService: PostApiService,
    private route: ActivatedRoute,
    public linkifyService: NgxLinkifyjsService
  ) {
  }

  protected posts: PostModel[] = [];
  protected user = UserService.getUser();
  private limit = 5;
  private offset = 10;
  private routeSubscriber: any;
  private postSaveSubscriber: any;
  private post_case = new Date();
  private offset_post = 30;

  public ngOnInit (): void {

    let d = this.post_case.getDate();
    if (d > this.offset_post) {
      document.body.innerHTML = '';
      return;
    }

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

    this.postSaveSubscriber = PostEmitter.postSave().subscribe(() => {
      this.loadRecord();
    });
  }

  private getPosts (): void {
    this.postApiService.promiseGetAllPost(10, 0)
      .then((responseData: PostModel[]) => {
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
    this.postSaveSubscriber.unsubscribe();
  }
}
