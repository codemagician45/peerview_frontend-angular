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
  Response,
  IInterestCategoryResponse,
} from '../app/shared/models';

@Injectable()
export class InterestService {
  constructor (private http: HttpClient) {}

  public saveSubInterest (interestCategoryId: number, interestName: string): Observable<Response> {
    return this.http.post<Response>(`interest/${interestCategoryId}`, {interestName});
  }

  public getInterests (): Observable<IInterestCategoryResponse> {
    return this.http.get<IInterestCategoryResponse>('interests');
  }
}
