import {
  UserModel
} from './User';
import {
  Course
} from './Course';


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
