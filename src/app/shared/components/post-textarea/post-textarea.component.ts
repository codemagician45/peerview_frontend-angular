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
  PollModel,
  CreatePoll,
  CampusPostModel
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
  ) {}

  private post: PostModel = new PostModel();
  private campusPost: CampusPostModel = new CampusPostModel();
  private createPoll: CreatePoll = new CreatePoll();
  private campusId: number;
  protected isToogleUploadComponentVisible: boolean = false;
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'post';
  protected pollOptions: Array<string> = ['NewPollOption1', 'NewPollOption2'];
  @Input() protected postMenu: boolean = true;
  @Input() protected pollMenu: boolean = true;
  @Input() protected shareMenu: boolean = true;
  @Input() protected route = {name: 'home'};

  public ngOnInit (): void {
    this.activatedRoute.parent.params.subscribe(param => {
      this.campusId = param.id;
    });
  }

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
            PostEmitter
              .postSave()
              .emit(postModel.id);
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
        this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
        this.campusApiService.createPost(this.campusId, this.campusPost);
        break;
    }
  }

  protected onClickWhichTypeIsSelected (type): void {
    this.typePost = type;
  }

  protected onAddPollOption (): void {
    if (this.pollOptions.length === 4) {
      MessageNotificationService.show({
        notification: {
          id: 'cannot-add-more-option',
          message: 'Cannot add more option',
          instruction: 'Only four (4) options are allowed.'
        }
      },
      NotificationTypes.Info);
    } else {
      let addNewPollOption = this.pollOptions.length + 1;
      this.pollOptions.push('NewPollOption' + addNewPollOption);
    }
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }

  protected onAddPoll (): any {
    if (!this.createPoll.question) {
      return MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Cannot Post Poll',
          instruction: 'Please fill in the form.'
        }
      },
      NotificationTypes.Error);
    }

    return this.postPoll();
  }

  private postPoll (): void {
    // switch (this.route.name) {
    //   case 'home':
    //     this.postService.createPoll(this.createPoll)
    //     .subscribe((response: IResponse) => {
    //       console.log('create poll', response);
    //       PostEmitter
    //       .postSave()
    //       .emit(response.data);
    //       this.createPoll.init();
    //       this.isButtonDisabledOnSubmit = false;
    //     }, error => {
    //       this.isButtonDisabledOnSubmit = false;
    //       console.log('create poll', error);
    //     });
    //     break;
    //   case 'campus':
    //     break;
    // }
  }
}
