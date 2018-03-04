import {
  UserModel
} from './user';
import {
  CommunityPost
} from './community-post';
import {
  UserStudyLevelModel
} from './user-study-level';
import {
  PostModel
} from './post';

export class Response {
  public status: string;
  public status_code: number;
  public http_code: number;
}

export class UserResponse extends Response {
  public user: UserModel;
}

export class CommunityPostResponse extends Response {
  public communityPosts: Array<CommunityPost>;
}

export class UserStudyLevelsResponse extends Response {
  public userStudyLevels: Array<UserStudyLevelModel>;
}

export interface PeersListResponse extends Response {
  peersList: Array<UserModel>;
}

export class PostsResponse extends Response {
  public posts: Array<PostModel>;
}

export class FolloweeResponse extends Response {
  public followee: Array<UserModel>;
}

export class FollowersResponse extends Response {
  public followers: Array<UserModel>;
}

export class SharePostResponse extends Response {
  public postId: number;
}

export class PostResponse extends Response {
  public post: PostModel;
}
