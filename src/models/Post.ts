import {
  UserModel
} from './User';

export class LikePost {}

export class RatePost {
  private rating: number;
}

export class ReplyPost {
  private comment: string;
  private postPollOptionId: number;
}

export class ReportPost {
  private reason: string;
}

export class SharePost {
  private postCategoryId: number;
  private message: string;
}

export class PostReply {
  public comment: string;
  public createdAt: Date;
  public user: UserModel;
}

export class Post {
  public courseId: number;
  public message: string;
  public likeCount: number;
  public pageviewCount: number;
  public postReply: Array<PostReply>;
  public ratingCount: number;
  public roundedRating?: number;
  public shareCount: number;
  public title?: string;
}

export class Career {
  private title: string;
  private description: string;
}

export class BrainstormingMap {
  private name: string;
  private node_id: number;
  private closed: boolean;
  private children: BrainstormingMap[];
}

export class Story {
  private title: string;
  private message: string;
}
