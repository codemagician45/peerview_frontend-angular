import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  CampusPostModel,
  CampusModel,
  IResponse
} from '../../app/shared/models';
import {
  CampusFactory
} from '../../app/shared/models/factory';

@Injectable()
export class CampusApiService extends ApiService {
  public options = {};
  public baseURI = '';
  public baseURIPlural = 'campus';

  /**
   * Basicallyh get the all the campuses
   */
  public getCampuses (): Promise<CampusModel[]> {
    this.baseURIPlural = 'campuses';
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return CampusFactory.createManyCampus(response.data);
      });
  }

  public promiseGetAllPost (id: number): any {
    this.baseURIPlural = 'campus';
    return this.promiseGetAllResponseData(`/${id}/posts`)
      .then((responseData: IResponse) => {
        return CampusFactory.createManyCampusPost(responseData.data);
      });
  }

  public createPost (campusId: number, post: CampusPostModel): Promise<IResponse> {
    return this.promisePostModelData(`/${campusId}/post`, post)
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public getAllFreshersFeed (id: number): Promise<IResponse> {
    return this.promiseGetResponseData(`${id}/freshers-feed`);
  }
}
