import {
  UserModel,
} from '../user';
import {
  Response
} from '../response';

// coming from the provider
export interface ISocialResponse extends Response {
  email: string;
  image: string;
  name: string;
  provider: string;
  uid: string
}

// coming from the api
export interface ISignInViaSocialResponse extends Response {
  user: UserModel;
}
