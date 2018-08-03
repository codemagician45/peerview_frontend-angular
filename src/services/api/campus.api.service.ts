import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  CampusPostModel,
  CampusModel,
  CampusFreshersFeedModel,
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

  public promiseGetAllPost (campusId: number): any {
    return this.promiseGetAllResponseData(`${campusId}/posts`)
      .then((responseData: IResponse) => {
        return CampusFactory.createManyCampusPost(responseData.data);
      });
  }

  public getAllFreshersFeed (id: number): Promise<CampusFreshersFeedModel[]> {
    return this.promiseGetResponseData(`${id}/freshers-feed`)
      .then((responseData: IResponse) => {
          return CampusFactory.createManyCampusFreshersFeed(responseData.data);
      });
  }

  public createPost (campusId: number, post: CampusPostModel): Promise<IResponse> {
    return this.promisePostModelData(`${campusId}/post`, post)
      .then((response: IResponse) => {
        return response.data;
      });
  }
}
