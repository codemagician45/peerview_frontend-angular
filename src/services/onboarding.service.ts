import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class OnboardingService {
  constructor (private http: HttpClient) { }

  public getUserTypeId (typecode: String): Observable<Object> {
    return this.http.get(`user/type/${typecode}`);
  }

  public saveSuggestedInterest (interestCategoryID: Number, interestName: String): Observable<Object> {
    return this.http.post(`interest/${interestCategoryID}`, { interestName: interestName }, {});
  }

  public deleteSuggestedInterest (interestId: Number): Observable<Object> {
    return this.http.delete(`interest/${interestId}`, {});
  }
}
