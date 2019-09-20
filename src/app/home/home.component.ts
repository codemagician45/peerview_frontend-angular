import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  PostApiService
} from '../../services/api';
import {
  PostModel, ProfileCompleteModel,
} from '../shared/models';
import {
  UserService, CheckProfileCompletionService
} from '../../services';
import {
  CryptoUtilities
} from '../shared/utilities';
import {
  ActivatedRoute
} from '@angular/router';
import {NgxLinkifyjsService, Link} from 'ngx-linkifyjs';
import {PostEmitter} from '../shared/emitter';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CompleteProfileDialogComponent } from '../shared/modals';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor (
    private postApiService: PostApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay,
    public linkifyService: NgxLinkifyjsService,
    private checkProfileIncompletion: CheckProfileCompletionService
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

    // let d = this.post_case.getDate();
    // if (d > this.offset_post) {
    //   document.body.innerHTML = '';
    //   return;
    // }

    if (this.user.initialized !== true) {
      this.user.initialized = true;
      UserService.setUser(this.user);
      if (
        !this.user.aboutMe ||
        !this.user.userSkills ||
        this.user.userSkills.length === 0 ||
        !this.user.workExperiences ||
        this.user.workExperiences.length === 0
      ) {
        let model = new ProfileCompleteModel;
        model.status = true;
        model.aboutme = !this.user.aboutMe;
        model.workExperience = !this.user.workExperiences || this.user.workExperiences.length === 0;
        model.skills = !this.user.userSkills || this.user.userSkills.length === 0;
        // this.checkProfileIncompletion.setStatus(model);
        setTimeout(() => {
          this.openProfileCompleteDialog(model);
        });
      }
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
        this.posts = responseData;
        console.log('posts', this.posts);
        this.posts.forEach(async post => {
          let findUrl: Link[] = await this.linkifyService.find(post.message);
          if (findUrl.length > 0 && findUrl[0].type === 'url') {
            let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
              .then((res: any) => {
                post.message = `${(post.message.replace(regex, ' ')).trim()}
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

  private openProfileCompleteDialog (value: ProfileCompleteModel): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'complete-profile-modal-wrapper';
    dialogConfig.id = 'CompleteProfileDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = value;
    this.dialog.open(CompleteProfileDialogComponent, dialogConfig);
  }
}
