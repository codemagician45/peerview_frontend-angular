import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import {
  CampusModel,
  CampusPostModel,
  CampusPostReplyModel,
  CampusFreshersFeedModel,
  CampusFreshersFeedPostModel,
  CampusCourseModel,
  IResponse
} from '../../app/shared/models';
import {
  CampusFactory
} from '../../app/shared/models/factory';

@Injectable()
export class CampusApiService extends ApiService {
  public options = {};
  public baseURI = 'campus';
  public baseURIPlural = 'campus';

  /**
   * Basically get the all the campuses
   */
  public getCampuses (): Promise<CampusModel[]> {
    this.cloneAbstractURIs();
    this.baseURIPlural = 'campuses';
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return CampusFactory.createManyCampus(response.data);
      });
  }

  public promiseGetAllPost (campusId: number, limit: number = 10, offset: number = 0): Promise<CampusPostModel[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

      this.options = {
        params: params
      };

    return this.promiseGetAllResponseData(`${campusId}/posts`)
      .then((response: IResponse) => {
        return CampusFactory.createManyCampusPost(response.data);
      });
  }

  public promiseGetAllFreshersFeedPost (campusId: number, freshersFeedId: number): Promise<CampusFreshersFeedPostModel[]> {
    return this.promiseGetAllResponseData(`${campusId}/freshers-feed/${freshersFeedId}/posts`)
      .then((response: IResponse) => {
        return CampusFactory.createManyCampusFreshersFeedPost(response.data);
      });
  }

  public promiseGetAllCampusCourse (campusId: number): Promise<CampusCourseModel[]> {
    return this.promiseGetAllResponseData(`${campusId}/course-list`)
      .then((response: IResponse) => {
        return CampusFactory.createCourseList(response.data);
      });
  }

  public getAllFreshersFeed (id: number): Promise<CampusFreshersFeedModel[]> {
    return this.promiseGetResponseData(`${id}/freshers-feed`)
      .then((response: IResponse) => {
          return CampusFactory.createManyCampusFreshersFeed(response.data);
      });
  }

  public promiseCreatePost (campusId: number, post: CampusPostModel): Promise<CampusPostModel> {
    return this.promisePostModelData(`${campusId}/post`, post)
      .then((response: IResponse) => {
        return CampusFactory.createCampusPost(response.data);
      });
  }

  public promiseCreatePostReply (campustPostId: number, campusPostReply: CampusPostReplyModel): Promise<IResponse> {
    return this.promisePostModelData(`post/${campustPostId}/reply`, campusPostReply)
      .then((responseData: IResponse) => {
        console.log(responseData);
        return responseData;
      });
  }
}
