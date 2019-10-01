import {
  Component,
  Input
} from '@angular/core';
import {
  PostApiService,
  CampusApiService
} from '../../../../services/api';
import {
  UserService,
} from '../../../../services';
import {
  PostModel,
  PostReplyModel,
  CampusPostReplyModel,
  UserModel,
  IResponse,
  PostRateModel
} from '../../models';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  SharedPostReplyCommentModalComponent
} from '../../modals';
import {
  CryptoUtilities
} from '../../utilities';
import { Link, NgxLinkifyjsService } from 'ngx-linkifyjs';

@Component({
  selector: 'shared-post-reply-component',
  templateUrl: './post-reply.component.html',
  styleUrls: ['./post-reply.component.scss']
})
export class SharedPostReplyComponent  {
  constructor (
    private postApiService: PostApiService,
    public linkifyService: NgxLinkifyjsService,
    private campusApiService: CampusApiService,
    private dialog: MatDialog,
    private overlay: Overlay,
  ) {}

  @Input() private post: PostModel = new PostModel();
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number};

  private user: UserModel = UserService.getUser();
  protected isUserCurrentlyCommenting = false;
  protected postReply: PostReplyModel = new PostReplyModel();
  protected campusPostReply: CampusPostReplyModel = new CampusPostReplyModel();
  protected rate: PostRateModel = new PostRateModel();

  public ngOnInit (): void {
    this.postReply.recipientId = this.post.user.id;
    this.post.postReply.forEach(async reply => {
      let findUrl: Link[] = await this.linkifyService.find(reply.comment);
      if (findUrl.length > 0 && findUrl[0].type === 'url') {
        let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
          .then((res: any) => {
            reply.comment = `${(reply.comment.replace(regex, ' ')).trim()}
              <div class="link-preview">
                <div class="link-area">
                <div class="og-image">
                  <a href="${res.data.url}" target="_blank">
                    <img src="${res.data.image}" alt="logo" />
                  </a>
                </div>
                <div class="descriptions">
                  <div class="og-title">${res.data.title}</div>
                  <div class="og-description">${res.data.description}</div>
                  <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                </div>
                </div>
              </div>`;
          });
      }
    });
  }

  protected onPostReply (): void {
    this.isUserCurrentlyCommenting = true;

    switch (this.route.name) {
      case 'home':
        this.postApiService.promiseCreatePostReply(this.post.id, this.postReply)
          .then(async (response: IResponse) => {
            this.postReply.user = this.user;
            this.postReply.createdAt = new Date();
            // clone the postReply
            let postReply: any = this.postReply.clone();
            if (response && response.data) {
              postReply.id = parseInt(CryptoUtilities.decipher(response.data.id), 10);

              let findUrl: Link[] = await this.linkifyService.find(postReply.comment);
              if (findUrl.length > 0 && findUrl[0].type === 'url') {
                let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
                  .then((res: any) => {
                    postReply.comment = `${(postReply.comment.replace(regex, ' ')).trim()}
                      <div class="link-preview">
                        <div class="link-area">
                        <div class="og-image">
                          <a href="${res.data.url}" target="_blank">
                            <img src="${res.data.image}" alt="logo" />
                          </a>
                        </div>
                        <div class="descriptions">
                          <div class="og-title">${res.data.title}</div>
                          <div class="og-description">${res.data.description}</div>
                          <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                        </div>
                        </div>
                      </div>`;
                  });
              }
              this.post.postReply.unshift(postReply);
            }
            this.postReply.init(); // this will initialize the data with blank ones
            this.isUserCurrentlyCommenting = false;
          })
          .catch(error => {
            console.log(error);
          });
        break;
      case 'campus':
      case 'campusFreshersFeed':
        this.campusPostReply.assimilate({comment: this.postReply.comment});
        this.campusApiService.promiseCreatePostReply(this.post.id, this.campusPostReply)
          .then(async (response: IResponse) => {
            this.campusPostReply.user = this.user;
            this.campusPostReply.createdAt = new Date();
            let campusPostReply: any = this.campusPostReply.clone();

            let findUrl: Link[] = await this.linkifyService.find(campusPostReply.comment);
            if (findUrl.length > 0 && findUrl[0].type === 'url') {
              let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
              this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
                .then((res: any) => {
                  campusPostReply.comment = `${(campusPostReply.comment.replace(regex, ' ')).trim()}
                    <div class="link-preview">
                      <div class="link-area">
                      <div class="og-image">
                        <a href="${res.data.url}" target="_blank">
                          <img src="${res.data.image}" alt="logo" />
                        </a>
                      </div>
                      <div class="descriptions">
                        <div class="og-title">${res.data.title}</div>
                        <div class="og-description">${res.data.description}</div>
                        <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                      </div>
                      </div>
                    </div>`;
                });
            }
            this.post.postReply.unshift(campusPostReply);
            this.postReply.init();
            this.isUserCurrentlyCommenting = false;
          })
          .catch(error => {});
        break;
    }
  }

  protected onDeletePostReply (replyId: number): void {
    this.postApiService.promiseRemovePostReply(replyId)
      .then((response: IResponse) => {
        let index = this.post['postReply'].findIndex((filter: any) => {
          return filter.id === replyId;
        });
        if (index > -1 ) {
          this.post['postReply'].splice(index, 1);
        }
        }).catch(error => {
        console.error('error', error);
      });
  }

  protected onOpenReplyComment (reply): void {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'post-comment-detail-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {post: this.post, reply: reply };
    this.dialog.open(SharedPostReplyCommentModalComponent, dialogConfig);
  }

  protected onClickPostReplyLike (postReplyItem): void {
    if (postReplyItem.isUserPostReplyLike) {
      this.postApiService.promiseRemovePostReplyLike(postReplyItem.id)
        .then((response: IResponse) => {
          let index = this.post['postReply'].findIndex((filter: any) => {
            return filter.id === postReplyItem.id;
          });
          if (index > -1 ) {
            postReplyItem.isUserPostReplyLike = false;
            this.post['postReply'][index] = postReplyItem;
          }
      }).catch(error => {
        console.error('error', error);
      });
    } else {
      this.postApiService.promiseCreatePostReplyLike(postReplyItem.id)
        .then((response: IResponse) => {
          let index = this.post['postReply'].findIndex((filter: any) => {
            return filter.id === postReplyItem.id;
          });
          if (index > -1 ) {
            postReplyItem.isUserPostReplyLike = true;
            this.post['postReply'][index] = postReplyItem;
          }
        }).catch(error => {
        console.error('error', error);
      });
    }
  }

  protected onStarClick (numberOfStars: number, item: PostReplyModel): void {
    this.rate.rating = numberOfStars;
    this.postApiService.promisePostReplyRate(item.id, this.rate)
      .then(response => {
        this.rate.init();
        item['postReplyRating'].ratingCount += 1;
        if (item['postReplyRating'].roundedRating === null || item['postReplyRating'].roundedRating === undefined ) {
          item['postReplyRating'].roundedRating = numberOfStars;
        } else if (item['postReplyRating'].roundedRating !== null || item['postReplyRating'].roundedRating !== undefined) {
          item['postReplyRating'].roundedRating =
            (item['postReplyRating'].roundedRating + item['postReplyRating'].ratingCount) / 2;
        }
        let index = this.post['postReply'].findIndex((filter: any) => {
          return filter.id === item.id;
        });
        if (index > -1 ) {
          this.post['postReply'][index] = item;
        }
      })
      .catch(error => {
        console.error('error', error);
      });
  }
}
