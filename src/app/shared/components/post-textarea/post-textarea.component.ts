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
  private poll: PollModel = new PollModel();
  private errorMessage: any;
  protected post: PostModel = new PostModel();
  protected isToogleUploadComponentVisible: boolean = false;
  protected isButtonDisabledOnSubmit: boolean = false;
  protected typePost: string = 'post';
  @Input() protected postMenu: boolean = true;
  @Input() protected pollMenu: boolean = true;
  @Input() protected shareMenu: boolean = true;
  @Input() protected route = {name: 'home'};

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
    }

    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }

    return this.postMessage();
  }

  protected onUploadComplete (attachments): void {
    this.createPost.attachments = attachments;
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
    if (this.poll.options.length === 4) {
      MessageNotificationService.show({
        notification: {
          id: 'cannot-add-more-option',
          message: 'Cannot add more option',
          instruction: 'Only four (4) options are allowed.'
        }
      },
      NotificationTypes.Info);
    } else {
      this.poll.options.push('');
    }
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    PostEmitter.removeSubscriber(PostEmitter.getUploadCompleteName());
  }
}
