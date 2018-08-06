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

  public promiseCreatePost (campusId: number, campusPost: CampusPostModel): Promise<CampusPostModel> {
    return this.promisePostModelData(`${campusId}/post`, campusPost)
      .then((response: IResponse) => {
        return CampusFactory.createCampusPost(response.data);
      });
  }

  public promiseCreatePostLike (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`post/${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRemovePostLike (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`post/${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseCreatePostPoll (campusId: number, campusPost: CampusPostModel): Promise<CampusPostModel> {
    return this.promisePostModelData(`${campusId}/post/poll`, campusPost)
      .then((response: IResponse) => {
        return CampusFactory.createCampusPost(response.data);
      });
  }

  public promiseVotePoll (campusPostPollOptionId: number): Promise<IResponse> {
    return this.promisePostModelData(`post/poll/${campusPostPollOptionId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseCreatePostReply (campustPostId: number, campusPostReply: CampusPostReplyModel): Promise<IResponse> {
    return this.promisePostModelData(`post/${campustPostId}/reply`, campusPostReply)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
}
