import {
  UserModel
} from './User';
import {
  Course
} from './Course';
import {
  Post
} from './Post';


export class Response {
  public status: string;
  public status_code: number;
  public http_code: number;
}

export class UnfollowUser extends Response {
  public user: any;
}

export class UserResponse extends Response {
  public user: UserModel;
}

export class CourseResponse extends Response {
  public courses: Array<Course>;
}

export class PeersListResponse extends Response {
  public peersList: Array<UserModel>;
}

export class PostsReponse extends Response {
  public posts: Array<Post>;
}

export class UserCreditsResponse extends Response {
  public userCredits: UserTotalCredits;
}

export interface UserTotalCredits {
   totalCredits: number;
}

export class PostResponse extends Response {
  public post: Post;
}
