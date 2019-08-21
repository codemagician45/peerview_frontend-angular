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

  @Injectable()
  export class SkillApiService extends ApiService {
    public options = {};
    public baseURI = 'skill';
    public baseURIPlural = 'skills';

    public promiseGetSkill (): Promise<any> {

      return this.promiseGetAllResponseData('')
        .then((response: IResponse) => {
          return response.data;
        });
    }

    public promiseAddSkill (data: any): Promise<any> {
        return this.promisePostData('add', data)
            .then((response: IResponse) => {
                return response.data;
            });
    }
}
