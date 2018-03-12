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
export class InterestService {
  constructor (private http: HttpClient) {}

  public saveSubInterest (interestCategoryId: number, interestName: string): Observable<Object> {
    return this.http.post(`interest/${interestCategoryId}`, {interestName});
  }

  public getInterests (): Observable<Object> {
    return this.http.get('interests');
  }
}
