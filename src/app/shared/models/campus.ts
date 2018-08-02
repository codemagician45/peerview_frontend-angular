import {
  Model
} from './model';
import {
  PostReplyModel
} from './post';

export class CampusModel extends Model {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;

  public init (): void {}
}

export class CampusPostModel extends Model {
  public id?: number;
  public createdAt: Date;
  public message: string;
  public likeCount: number;
  public pageviewCount: number;
  public campusPostReply: Array<PostReplyModel>;
  public ratingCount: number;
  public roundedRating?: number;
  public attachments: String[];

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      message: undefined,
      attachments: []
    });
  }
}
