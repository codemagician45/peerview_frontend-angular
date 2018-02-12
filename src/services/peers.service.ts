import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  UserOnboardingDetails
} from '../models/models';

@Injectable()
export class PeersService {
  constructor (private http: HttpClient) {}

  public list (): Observable<Object> {
    return this.http.get('peers-list');
  }
}

