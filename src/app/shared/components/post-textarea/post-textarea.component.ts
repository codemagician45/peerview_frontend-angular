import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  IResponse,
  PostModel,
  PostPollModel,
  CampusPostModel,
  CampusFreshersFeedPostModel
} from '../../models';
import {
  PostApiService
} from '../../../../services/api';
import {
  CampusApiService
} from '../../../../services/api';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
import {
  CryptoUtilities
} from '../../../shared/utilities';
declare let swal: any;

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor (
    private postApiService: PostApiService,
    private campusApiService: CampusApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.post.postPoll = new PostPollModel();
  }

  private post: PostModel = new PostModel();
  private postPoll: PostPollModel = new PostPollModel();
  private campusPost: CampusPostModel = new CampusPostModel();
  private campusFreshersFeedPost: CampusFreshersFeedPostModel = new CampusFreshersFeedPostModel();
  private campusId: number;
  protected isToogleUploadComponentVisible: boolean = false;
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'post';
  // protected pollOptions: Array<string> = ['NewPollOption1', 'NewPollOption2'];
  @Input() protected postMenu: boolean = true;
  @Input() protected pollMenu: boolean = true;
  @Input() protected shareMenu: boolean = true;
  @Input() protected route: {name: string, campusId?: number, campusFreshersFeedId?: number} = {name: 'home'};

  public ngOnInit (): void {}

  protected onAddPost (): any {
    if (!this.post.message) {
      return MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Cannot Post',
          instruction: 'Please add a message.'
        }
      },
      NotificationTypes.Error);
    }

    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }

    return this.postMessage();
  }

  protected onUploadComplete (attachments): void {
    this.post.attachments = attachments;
    this.postMessage(true);
  }

  protected postMessage (isWithAttachments = false): void {
    // basically post-text-are-component will be use in the
    // campus route so basically we need an identifier to tell
    // if we are in the home or campus route that is
    // the use of this.route @Input
    switch (this.route.name) {
      case 'home':
        this.isToogleUploadComponentVisible = false;
        this.postApiService.promiseCreatePost(this.post)
          .then((postModel: PostModel) => {
            PostEmitter.postSave()
              .emit(postModel);
            // this will set the createPost call the setBlankDataStructure
            this.post.init();
            this.isButtonDisabledOnSubmit = false;
          })
          .catch(error => {
            this.isButtonDisabledOnSubmit = false;
          });
        break;
      case 'campus':
        this.campusPost.assimilate({message: this.post.message});
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        this.campusApiService.promiseCreatePost(this.campusId, this.campusPost)
          .then((campusPost: CampusPostModel) => {
            PostEmitter.postSave()
              .emit(campusPost);
            this.campusPost.init();
            this.post.init();
          })
          .catch(error => {});
        break;
      case 'campusFreshersFeed':
        let campusFreshersFeedId = parseInt(CryptoUtilities.decipher(this.route.campusFreshersFeedId), 10);
        this.campusFreshersFeedPost.assimilate({
          message: this.post.message,
          campusFreshersFeedId: campusFreshersFeedId
        });
        this.campusId = parseInt(CryptoUtilities.decipher(this.route.campusId), 10);
        // this.campusApiService.promiseCreatePost(this.campusId, this.campusFreshersFeedPost)
        //   .then((response: IResponse) => {
        //     this.campusFreshersFeedPost.init();
        //     this.post.init();
        //   })
          // .catch(error => {});
        break;
    }
  }

  protected onClickWhichTypeIsSelected (type): void {
    this.typePost = type;
  }

  protected onAddPollOption (): void {
    if (this.postPoll.options.length === 4) {
      MessageNotificationService.show({
        notification: {
          id: 'cannot-add-more-option',
          message: 'Cannot add more option',
          instruction: 'Only four (4) options are allowed.'
        }
      },
      NotificationTypes.Warning);
    } else {
      this.postPoll.options.push('');
    }
  }

  protected onAddPoll (): any {
    if (!this.post.postPoll.question) {
      return MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Cannot Post Poll',
          instruction: 'Please fill in the form.'
        }
      },
      NotificationTypes.Error);
    }

    return this.createPostPoll();
  }

  private createPostPoll (): void {
    switch (this.route.name) {
      case 'home':
        this.post.postPoll.options = this.post.postPoll.options.filter(option => option.trim() !== '');
        this.postApiService.promiseCreatePostPoll(this.post)
          .then((post: PostModel) => {
            PostEmitter.postSave()
              .emit(post);
            this.postPoll.init();
            this.post.postPoll.init();
          })
          .catch(error => {});
        break;
      case 'campus':
        break;
    }
  }

  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }
}
