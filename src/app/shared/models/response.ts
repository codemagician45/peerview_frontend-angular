import {
  UserModel
} from './user';
import {
  CommunityPost
} from './community-post';
import {
  UserStudyLevelModel
} from './user-study-level';

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
