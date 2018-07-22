import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  Response
} from '../../app/shared/models';

@Injectable()
export class CampusApiService extends ApiService {
  protected options: any;

  public getCampuses (): Promise<Response> {
    return this.promiseGetResponseData('campuses');
  }
}
