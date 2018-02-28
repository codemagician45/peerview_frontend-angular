import {
  Component,
} from '@angular/core';

import {
  EmitterService
} from '../../emitter/emitter.component';

@Component({
  selector: 'shared-post-textarea-component',
  templateUrl: './post-textarea.component.html',
  styleUrls: ['./post-textarea.component.scss']
})

export class SharedPostTextareaComponent {
  constructor () {}

  private uploadImagesEmitterService = EmitterService.get('uploadImagesEmitter');
  private uploadCompleteSubscriber = EmitterService.get('uploadCompleteEmitter');
  protected toggleUploadComponent: boolean = false;
  protected postMessage: string = null;
  private postAttachments: Array<object> = [];

  public ngOnInit (): void {
    this.uploadComplete();
  }

  protected addPost (): void {
    if (this.postMessage) {
      if (this.toggleUploadComponent) {
        this.uploadImagesEmitterService.emit('saveImages');
      } else {
        this.postMessageOnly();
      }
    } else {
      console.log('Post message is required.');
    }
  }

  private uploadComplete (): void {
    this.uploadCompleteSubscriber.subscribe(response => {
      this.postAttachments = response;

      if (response.length !== 0) {
        this.postWithAttachments();
      } else {
        this.postMessageOnly();
      }
    });
  }

  private postMessageOnly (): void {
    console.log('data:', this.postMessage);
    console.log('run post api for message content only');
  }

  private postWithAttachments (): void {
    console.log('data:', this.postMessage, this.postAttachments);
    console.log('run post api with message and attachments');
    this.toggleUploadComponent = false;
  }

  protected showUploadComponent (): void {
    this.toggleUploadComponent = !this.toggleUploadComponent;
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    EmitterService.clear(['uploadCompleteEmitter']);
  }
}
