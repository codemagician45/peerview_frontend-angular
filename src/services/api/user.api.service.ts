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
  IResponse,
  FollowUser
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

  public promiseGetUserByJotToken (jotToken: string, token: string): Promise<UserModel> {
    let params = new HttpParams()
      .set('token', token.toString());

      this.options = {
        params: params
      };

    return this.promiseGetResponseData(`by-jot-token/${jotToken}`)
      .then((response: IResponse) => {
        return UserFactory.create(response.data);
      });
  }

  public promiseGetTimeline (userId?: number, limit?: number, offset?: number): Promise<PostModel[]> {
    let params: HttpParams;

    if (userId) {
      params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('userId', userId.toString());
    } else {
      params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    }

    return this.promiseGetAllResponseData('timeline', {params: params})
      .then((response: IResponse) => {
        return PostFactory.createManyPost(response.data);
      });
  }

  public promiseGetWorkExperience (userId?: number): Promise<PostModel[]> {
    let params: HttpParams;
    if (userId) {
      params = new HttpParams()
        .set('userId', userId.toString());
    }

    return this.promiseGetAllResponseData('work-experience', {params: params})
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseGetEducation (userId?: number): Promise<PostModel[]> {
    let params: HttpParams;
    if (userId) {
      params = new HttpParams()
        .set('userId', userId.toString());
    }

    return this.promiseGetAllResponseData('education', {params: params})
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseGetAward (userId?: number): Promise<PostModel[]> {
    let params: HttpParams;
    if (userId) {
      params = new HttpParams()
        .set('userId', userId.toString());
    }

    return this.promiseGetAllResponseData('award', {params: params})
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseGetSkill (userId?: number): Promise<PostModel[]> {
    let params: HttpParams;
    if (userId) {
      params = new HttpParams()
        .set('userId', userId.toString());
    }

    return this.promiseGetAllResponseData('skill', {params: params})
      .then((response: IResponse) => {
        return response.data;
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

  public promiseGetFollowers (userId: number): Promise<UserModel[]> {
    return this.promiseGetAllResponseData(`followers/${userId}`)
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }

  public promiseGetFollowees (userId: number): Promise<UserModel[]> {
    return this.promiseGetAllResponseData(`followee/${userId}`)
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }

  public sendVerifyEmailCode (data: any): Promise<any> {
    return this.promisePostData('send-verify-code', data)
      .then((response: IResponse) => {
        return response;
      });
  }

  public verifyChangedPrimaryEmail (data: any): Promise<any> {
    return this.promisePostData('verify-changed-email', data)
    .then((response: IResponse) => {
      return response;
    });
  }

  public promiseUpdateGeneralSetting (data: any): Promise<any> {
    return this.promisePostData('general-setting', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseAddWorkExperience (data: any): Promise<any> {
    return this.promisePostData('add-work-experience', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdateWorkExperience (data: any): Promise<any> {
    return this.promisePostData('update-work-experience', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseDeleteWorkExperience (data: any): Promise<any> {
    return this.promisePostData('remove-work-experience', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseAddEducation (data: any): Promise<any> {
    return this.promisePostData('add-education', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdateEducation (data: any): Promise<any> {
    return this.promisePostData('update-education', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseDeleteEducation (data: any): Promise<any> {
    return this.promisePostData('remove-education', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseAddAwards (data: any): Promise<any> {
    return this.promisePostData('add-awards', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdateAwards (data: any): Promise<any> {
    return this.promisePostData('update-awards', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseDeleteAwards (data: any): Promise<any> {
    return this.promisePostData('remove-awards', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseAddSkill (data: any): Promise<any> {
    return this.promisePostData('add-skill', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseSaveGPA (data: any): Promise<any> {
    return this.promisePostData('save-gpa', data)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseUpdateSocialLinks (data: any): Promise<any> {
    return this.promisePostData('update-social-links', data)
      .then((responseData: IResponse) => {
        return responseData;
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

  public promiseUpdateAboutMe (user: UserModel): Promise<any> {
    return this.promisePutModelData('about-me', user)
      .then((response: IResponse) => {
        return response;
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

  public promiseGetUserCredits (): Promise<IResponse> {
    return this.promiseGetAllResponseData('credits')
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

  public promisePostFollowUser (followUser: FollowUser): Promise<IResponse> {
    return this.promisePostModelData(`${followUser.recipientId}/follow`, followUser)
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

  public promisePostUnfollowUser (userId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${userId}/follow`)
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

  public promisePostInviteUser (user: UserModel): Promise<IResponse> {
    return this.promisePostModelData(`invite-user`, user)
    .then((responseData: IResponse) => {
      return responseData;
    });
  }

  public promiseGetSearchViaTag (keyword: string): Promise<UserModel[]> {
    let params: HttpParams = new HttpParams()
        .set('keyword', keyword.toString());

    return this.promiseGetAllResponseData(`search/via-tag`, {params: params})
      .then((response: IResponse) => {
        return UserFactory.createMany(response.data);
      });
  }
}
