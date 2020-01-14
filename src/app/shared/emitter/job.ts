import {
  EventEmitter
} from '@angular/core';
import {
  EmitterService
} from './emitter.component';

export class JobEmitter {
  constructor () {}

  public static getJobSaveName (): string {
    return 'getJobSave';
  }

  public static getUploadImagesName (): string {
    return 'getUploadImages';
  }

  public static getUploadCompleteName (): string {
    return 'onUploadComplete';
  }

  /**
   * Sharing between SharedJobComponent
   * and SharedJobOptionsComponent
   * @summary It will call upon success in the sharing of post
   */
  public static getJobShareName (): string {
    return 'getJobShare';
  }

  public static jobSave (): any {
    return EmitterService.get('getJobSave');
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
