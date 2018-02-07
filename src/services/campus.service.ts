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
  LikeCampusPost,
  CampusPoll,
  RateCampusPost,
  ReplyCampusPost,
  ReportCampusPost,
  CampusPost,
  CampusMarketPlace
} from '../models/models';

@Injectable()
export class CampusService {
  constructor (private http: HttpClient) {}

  public getfreshersfeedpost (campusId: Number = 1, freshersFeedId: Number = 1): Observable<Object> {
    return this.http.get(`campus/${campusId}/freshers-feed/${freshersFeedId}/posts`);
  }

  public getcampusposts (campusId: Number): Observable<Object> {
    return this.http.get(`campus/${campusId}/posts`);
  }

  public sharepost (postid: number, share: any): Observable<Object> {
    return this.http.post(`post/share/${postid}`, share);
  }

  public likepost (postid: number, like: LikeCampusPost): Observable<Object> {
    return this.http.post(`campus/post/${postid}/like`, like);
  }

  public replypost (postId: number, reply: ReplyCampusPost): Observable<Object> {
    return this.http.post(`campus/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusPost): Observable<Object> {
    return this.http.post(`campus/post/${postId}/report`, report);
  }

  public ratepost (postId: number, rate: RateCampusPost): Observable<Object> {
    return this.http.post(`campus/post/${postId}/rating`, rate);
  }

  public postviewpost (postId: number): Observable<Object> {
    return this.http.post(`campus/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, poll: CampusPoll): Observable<Object> {
    return this.http.post(`campus/${campusId}/post/poll`, poll);
  }

  public createpost (campusId: number, post: CampusPost): Observable<Object> {
    return this.http.post(`campus/${campusId}/post`, post);
  }

  public getcampuspost (postId: number): Observable<Object> {
    return this.http.get(`campus/post/${postId}`);
  }

  public getjob (jobId: number): Observable<Object> {
    return this.http.get(`campus/job/${jobId}`);
  }

  public createmarketplace (campusId: number, market: CampusMarketPlace): Observable<Object> {
    return this.http.post(`campus/${campusId}/marketplace`, market);
  }

  public createuserclasses (campusCourseClassIds: number[]): Observable<Object> {
    return this.http.post('campus/user/classes', campusCourseClassIds);
  }
}
