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
export class NotificationService {
  constructor (private http: HttpClient) {}

  public getNotifications (start: number, size: number): Observable<Object> {
    return this.http.get(`notifications/${start}/${size}`);
  }

  public getMessages (start: number, size: number): Observable<Object> {
    return this.http.get(`message/headers/${start}/${size}`);
  }
}
