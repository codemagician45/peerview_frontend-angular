import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from '../../emitter/emitter.component';
import {
  PostEmitter
} from '../../emitter';
import {
  PostModel,
  SharePostResponse,
  CreatePost,
  PollModel
} from '../../models';
import {
  PostService
} from '../../../../services/services';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../services';
declare let swal: any;

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor (
    private postService: PostService
  ) {}

  private createPost: CreatePost = new CreatePost();
  private createPoll: PollModel = new PollModel();
  private errorMessage: any;
  protected post: PostModel = new PostModel();
  protected isToogleUploadComponentVisible: boolean = false;
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'post';
  protected pollOptions: Array<string> = ['NewPollOption1', 'NewPollOption2'];
  @Input() protected postMenu: boolean = true;
  @Input() protected pollMenu: boolean = true;
  @Input() protected shareMenu: boolean = true;
  @Input() protected route = {name: 'home'};

<<<<<<< HEAD
  protected onAddPost (): any {
    if (!this.createPost.message) {
      return MessageNotificationService.show({
        notification: {
          id: 'shared-post-textarea-message',
          message: 'Cannot Post',
          instruction: 'Please add a message.'
        }
      },
      NotificationTypes.Error);
=======
  public ngOnInit (): void {
    this.uploadComplete();
  }

  protected onAddPost (): void {
    this.isButtonDisabledOnSubmit = true;
    if (this.createPost.message) {
      if (this.toggleUploadComponent) {
        PostEmitter
        .uploadImages()
        .emit('saveImages');
      } else {
        this.postMessageOnly();
      }
    } else {
      console.log('Post message is required.');
      this.isButtonDisabledOnSubmit = false;
>>>>>>> Adjusted Post Textarea Component for the Post Poll Function
    }

    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }

<<<<<<< HEAD
    return this.postMessage();
  }

  protected onUploadComplete (attachments): void {
    this.createPost.attachments = attachments;
    this.postMessage(true);
=======
  private postMessageOnly (): void {
    delete this.createPost.attachments;
    this.postService.createPost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      PostEmitter
      .postSave()
      .emit(response.postId);
      this.createPost.message = '';
      this.isButtonDisabledOnSubmit = false;
    }, error => {
      this.isButtonDisabledOnSubmit = false;
      console.log(error);
    });
  }

  private postWithAttachments (): void {
    this.toggleUploadComponent = false;
    this.postService.createPost(this.createPost)
    .subscribe((response: SharePostResponse) => {
      PostEmitter
      .postSave()
      .emit(response.postId);
      this.createPost.message = '';
      this.createPost.attachments = [];
      this.isButtonDisabledOnSubmit = false;
    }, error => {
      console.log(error);
      this.isButtonDisabledOnSubmit = false;
    });
>>>>>>> Adjusted Post Textarea Component for the Post Poll Function
  }

  protected postMessage (isWithAttachments = false): void {
    // basically post-text-are-component will be use in the
    // campus route so basically we need an identifier to tell
    // if we are in the home or campus route that is
    // the use of this.route @Input
    switch (this.route.name) {
      case 'home':
        this.isToogleUploadComponentVisible = false;
        this.postService.createpost(this.createPost)
        .subscribe((response: SharePostResponse) => {
          PostEmitter
          .postSave()
          .emit(response.postId);
          // this will set the createPost call the setBlankDataStructure
          this.createPost.init();
          this.isButtonDisabledOnSubmit = false;
        }, error => {
          console.log(error);
          this.isButtonDisabledOnSubmit = false;
        });
        break;
      case 'campus':
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

  protected onAddPoll (): void {
    this.isButtonDisabledOnSubmit = true;
    if (this.createPoll.question) {
      this.postService.createPoll(this.createPoll)
      .subscribe((response: SharePostResponse) => {
        console.log('create poll', response);
        PostEmitter
        .postSave()
        .emit(response.postId);
        this.isButtonDisabledOnSubmit = false;
        this.createPoll.question = null;
        this.createPoll.options = [];
        this.createPoll.duration = null;
      }, error => {
        this.isButtonDisabledOnSubmit = false;
        console.log('create poll', error);
      });
    } else {
      console.log('Post message is required.');
      this.isButtonDisabledOnSubmit = false;
    }
  }
}
