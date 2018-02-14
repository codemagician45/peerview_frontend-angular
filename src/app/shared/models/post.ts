import {
  UserModel
} from './user';

export interface IPostReply {
  comment: string;
  createdAt: Date;
  user: UserModel;
}

export class PostModel {
  public id?: number;
  public courseId: number;
  public isUserLike: number;
  public message: string;
  public likeCount: number;
  public pageviewCount: number;
  public postReply: Array<IPostReply>;
  public ratingCount: number;
  public roundedRating?: number;
  public shareCount: number;
  public title?: string;
}
