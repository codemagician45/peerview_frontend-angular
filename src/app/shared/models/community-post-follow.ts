import {Model} from './model';

export class CommunityPostFollow extends Model {
  public postId: number;

  public init (): void {
    this.setBlankDataStructure ({
      postId: null,
    });
  }
}
