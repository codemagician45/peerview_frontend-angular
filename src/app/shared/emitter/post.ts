import {
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from './emitter.component';

export class PostEmitter {
  constructor () {}

  public static createPost (): any {
    return EmitterService.get('getCreatePost');
  }

  public static postSave (): any {
    return EmitterService.get('getPostSave');
  }

  public static uploadImages (): any {
      return EmitterService.get('getUploadImages');
  }

  public static uploadComplete (): any {
      return EmitterService.get('onUploadComplete');
  }

  public static removeSubscriber (channel): void {
    EmitterService.remove(channel);
  }

}
