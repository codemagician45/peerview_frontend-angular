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
import {
  CampusModel
} from '../campus';

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

export interface IPostToResponse extends Response {
  postId: number;
}

export interface ICampusesResponse extends Response {
  campuses: Array<CampusModel>;
}
