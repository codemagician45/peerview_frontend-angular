import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  HttpParams
} from '@angular/common/http';
import {
  UserModel,
  UserStudyLevelModel,
  UserTypeModel,
  PostModel,
  IResponse
} from '../../app/shared/models';
import {
  UserFactory,
  PostFactory
} from '../../app/shared/models/factory';

@Injectable()
export class UserApiService extends ApiService {
  public options = {};
  public baseURI = 'user';
  public baseURIPlural = 'user';

  public promiseGetUser (userId?: number): Promise<UserModel> {
    if (userId) {
      let params = new HttpParams()
        .set('userId', userId.toString());

        this.options = {
          params: params
        };
    }

    return this.promiseGetResponseData('profile')
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseGetType (typeCode: string): Promise<UserTypeModel> {
    return this.promiseGetResponseData(`type/${typeCode}`)
      .then((responseData: IResponse) => {
        return UserFactory.createType(responseData.data);
      });
  }

  public promiseGetTimeline (userId?: number): Promise<PostModel[]> {
    if (userId) {
      let params = new HttpParams()
        .set('userId', userId.toString());

        this.options = {
          params: params
        };
    }

    return this.promiseGetAllResponseData('timeline')
      .then((response: IResponse) => {
        return PostFactory.createManyPost(response.data);
      });
  }

  public promiseGetStudyLevels (): Promise<UserStudyLevelModel[]> {
    return this.promiseGetAllResponseData('study-levels')
      .then((response: IResponse) => {
        return UserFactory.createManyStudyLevel(response.data);
      });
  }

  public promiseGetPeersList (): Promise<UserModel[]> {
    return this.promiseGetAllResponseData('peers-list')
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }

  public promiseGetFollowers (): Promise<UserModel[]> {
    return this.promiseGetAllResponseData('followers')
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }

  public promiseGetFollowee (): Promise<UserModel[]> {
    return this.promiseGetAllResponseData('followee')
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }

  public promiseUpdateOnboardingDetails (user: UserModel): Promise<IResponse> {
    return this.promisePostModelData('onboarding/details', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseVerifyEmail (jotToken: string, user: UserModel): Promise<UserModel> {
    return this.promisePostModelData(`verify-email/${jotToken}`, user)
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseCreateUserSubInterest (user: UserModel): Promise<IResponse> {
    return this.promisePostModelData('interests', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRegister (user: UserModel): Promise<IResponse> {
    return this.promisePostModelData('register', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRegisterViaSocialMedia (user: UserModel): Promise<UserModel> {
    return this.promisePostModelData('social-login', user)
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseSignIn (user: UserModel): Promise<UserModel> {
    return this.promisePostModelData('login', user)
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseUpdateAboutMe (user: UserModel): Promise<UserModel> {
    return this.promisePutModelData('about-me', user)
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseUpdateSecurity (user: UserModel): Promise<IResponse> {
    return this.promisePutModelData('security', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdatePassword (user: UserModel): Promise<IResponse> {
    return this.promisePutModelData('password', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdateProfilePicture (user: UserModel): Promise<IResponse> {
    return this.promisePutModelData('profile-picture', user)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseGetUserCredits (user: UserModel): Promise<IResponse> {
    return this.promiseGetAllResponseData('credits')
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

  public promisePostFollowUser (userId: number): Promise<IResponse> {
    return this.promisePostModelData(`${userId}/follow`)
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

}
