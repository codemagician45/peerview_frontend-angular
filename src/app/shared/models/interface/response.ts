import {
  UserModel,
} from '../user';
import {
  Response
} from '../response';
import {
  InterestCategoryModel
} from '../interest-category';
import {
  SubInterestModel
} from '../sub-interest';
import {
  PostModel
} from '../post';

// coming from the provider
export interface ISocialResponse extends Response {
  email: string;
  photoUrl: string;
  name: string;
  provider: string;
  id: string
}

// coming from the api
export interface ISignInViaSocialResponse extends Response {
  user: UserModel;
}

export interface ISignUpViaSocialResponse extends Response {
  user: UserModel;
}

export interface IInterestCategoryResponse extends Response {
  interestCategory: Array<InterestCategoryModel>;
}

export interface ISubInterestsResponse extends Response {
  interests: Array<SubInterestModel>;
}

export class IPostToResponse extends Response {
  public postId: number;
}
