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
  CampusFreshersFeedPoll,
  LikeCampusFreshersFeedPost,
  ReplyCampusFreshersFeedPost,
  ReportCampusFreshersFeedPost,
  CampusFreshersFeedPost
} from '../models/models';

@Injectable()
export class CampusFreshersFeedPostService {
  constructor (private http: HttpClient) {}

  public likepost (postId: number, like: LikeCampusFreshersFeedPost): Observable<Object> {
    return this.http.post(`campus/freshers-feed/post/${postId}/like`, like);
  }

  public pageviewpost (postId: number): Observable<Object> {
    return this.http.post(`campus/freshers-feed/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, freshersFeedId: number, poll: CampusFreshersFeedPoll): Observable<Object> {
    return this.http.post(`campus/${campusId}/freshers-feed/${freshersFeedId}/post/poll`, poll);
  }

  // TO-DO Inform post value missing from description
  public ratepost (postId: number): Observable<Object> {
    return this.http.post(`campus/freshers-feed/post/${postId}/rating`, {});
  }

  public replypost (postId: number, reply: ReplyCampusFreshersFeedPost): Observable<Object> {
    return this.http.post(`campus/freshers-feed/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusFreshersFeedPost): Observable<Object> {
    return this.http.post(`campus/freshers-feed/post/${postId}/report`, report);
  }

  public createpost (campusId: number, freshersFeedId: number, post: CampusFreshersFeedPost): Observable<Object> {
    return this.http.post(`campus/${campusId}/freshers-feed/${freshersFeedId}/post`, post);
  }

  public getfeed (campusId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/freshers-feed`);
  }

  public getfeedposts (campusId: number, feedId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/freshers-feed/${feedId}/posts`);
  }

  public getfeedpost (postId: number): Observable<Object> {
    return this.http.get(`campus/freshers-feed/post/${postId}`);
  }
}
