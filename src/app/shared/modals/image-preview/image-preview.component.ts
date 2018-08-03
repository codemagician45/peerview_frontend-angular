import {
  Component,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  PostEmitter
} from '../../emitter';
import {
  UserModel,
  IResponse
} from '../../models';
import {
  UserApiService
} from '../../../../services/api';

@Component({
  selector: 'shared-image-preview-component',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class SharedImagePreviewComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) public imageAttachments: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {}

  @ViewChild('clImageRef', {read: ElementRef}) private clImageRef: ElementRef;
  private imageOrientation: string = null;
  protected isToogleUploadComponentVisible: boolean = false;
  private user: UserModel = new UserModel();

  public ngAfterViewInit (): void {
    this.getImageOrientation();
  }

  protected onPreviousImage (): void {
    if (this.imageAttachments.clickIndex !== 0) {
      this.imageAttachments.clickIndex -= 1;
      this.getImageOrientation();
    }
  }

  protected onNextImage (): void {
    if (this.imageAttachments.images.length > 1 && this.imageAttachments.clickIndex < (this.imageAttachments.images.length - 1)) {
      this.imageAttachments.clickIndex += 1;
      this.getImageOrientation();
    }
  }

  protected onCloseModal (): void {
    this.dialog.closeAll();
  }

  private getImageOrientation (): void {
    setTimeout(() => {
      let imageRef = this.clImageRef.nativeElement.children[0];
      let closeToSquare = (imageRef.clientWidth - imageRef.clientHeight) <= 200;
      let widthIsGreater = imageRef.clientWidth > imageRef.clientHeight;

      if (closeToSquare) {
        this.imageOrientation = 'portrait';
      } else if (widthIsGreater) {
        this.imageOrientation = 'landscape';
      } else {
        this.imageOrientation = 'portrait';
      }
    }, 80);
  }

  protected onChangeProfilePicture (): any {
    // if (!this.createPost.message) {
    //   return MessageNotificationService.show({
    //     notification: {
    //       id: 'shared-post-textarea-message',
    //       message: 'Cannot Post',
    //       instruction: 'Please add a message.'
    //     }
    //   },
    //   NotificationTypes.Error);
    // }

    if (this.isToogleUploadComponentVisible) {
      return PostEmitter.uploadImages().emit();
    }
  }

  protected onUploadComplete (attachments): void {
    this.user.profilePicture = attachments[0].cloudinaryPublicId;
    this.userApiService.promiseUpdateProfilePicture(this.user)
      .then((response: IResponse) => {
        console.log('change photo success', response);
        this.onCloseModal();
      }).catch(error => {
        console.log('change photo success', error);
      });
  }
}
