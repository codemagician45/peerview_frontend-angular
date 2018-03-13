import {
  UserModel
} from './user';

export class PostModel {
  public id?: number;
  public courseId: number;
  public isUserPostLike: number;
  public createdAt: Date;
  public isUserLike: number;
  public message: string;
  public likeCount: number;
  public pageviewCount: number;
  public postReply: Array<PostReply>;
  public ratingCount: number;
  public roundedRating?: number;
  public shareCount: number;
  public title?: string;
}

export class LikePost {}

export class ReplyPost {
  public comment: string;
  public postPollOptionId: number;
}

export class PostReply {
  public comment: string;
  public createdAt: Date;
  public user: UserModel;
}

export class SharePost {
  public postCategoryId: number;
  public message?: string;
}

export class ReportPost {
  public id: number;
  public reason: string;
}

export class CreatePost {
  public message: string;
  public attachments?: Array<object> = [];
}
