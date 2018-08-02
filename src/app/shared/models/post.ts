import {
  UserModel
} from './user';
import {
  Model
} from './model';

export class PostModel extends Model {
  public id?: number;
  public courseId: number;
  public isUserPostLike: number;
  public createdAt: Date;
  public isUserLike: number;
  public message: string;
  public likeCount: number;
  public pageviewCount: number;
  public postReply: Array<PostReplyModel>;
  public ratingCount: number;
  public roundedRating?: number;
  public shareCount: number;
  public title?: string;
  public attachments: String[];
  // used as a virtual holder for postTo
  public postTo?: number;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      courseId: undefined,
      message: undefined,
      attachments: []
    });
  }
}

export class PostReplyModel extends Model {
  public id?: number;
  public comment: string;
  public user?: UserModel;
  public hideComment?: boolean;
  public postPollOptionId?: number;
  public createdAt?: Date;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      comment: undefined,
      user: undefined,
      hideComment: undefined,
      postPollOptionId: undefined,
      createdAt: undefined
    });
  }
}

export class LikePost {}


export class SharePostModel extends Model {
  public id?: number;
  public message: string;

  public init (): void {}
}

export class ReportPostModel extends Model {
  public id?: number;
  public reason: string;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      reason: undefined
    });
  }
}

export class CreatePost extends Model {
  public message: string;
  public attachments?: Array<object> = [];

  public init (): void {
    this.setBlankDataStructure({
      message: '',
      attachments: []
    });
  }
}
