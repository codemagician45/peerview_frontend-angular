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
  LikeCampusSocietyClubPost,
  ReplyCampusSocietyClubPost,
  ReportCampusSocietyClubPost,
  RateCampusSocietyClubPost,
  CampusCourseClassPost,
  CampusSocietyClubPost,
  CampusSocietyClub
} from '../models/models';

@Injectable()
export class CampusSocietyClubService {
  constructor (private http: HttpClient) {}

  public likepost (postid: number, like: LikeCampusSocietyClubPost): Observable<Object> {
    return this.http.post(`campus/society-club/post/${postid}/like`, like);
  }

  public replypost (postId: number, reply: ReplyCampusSocietyClubPost): Observable<Object> {
    return this.http.post(`campus/society-club/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusSocietyClubPost): Observable<Object> {
    return this.http.post(`campus/society-club/post/${postId}/report`, report);
  }

  public ratepost (postId: number, rate: RateCampusSocietyClubPost): Observable<Object> {
    return this.http.post(`campus/society-club/post/${postId}/rating`, rate);
  }

  public viewpost (postId: number): Observable<Object> {
    return this.http.post(`campus/society-club/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, poll: CampusCourseClassPost): Observable<Object> {
    return this.http.post(`campus/society-club/${campusId}/post/poll`, poll);
  }

  public createpost (campusId: number, post: CampusSocietyClubPost): Observable<Object> {
    return this.http.post(`campus/society-club/${campusId}/post`, post);
  }

  public createsocietyclub (campusId: number, societyclub: CampusSocietyClub): Observable<Object> {
    return this.http.post(`campus/${campusId}/society-club`, societyclub);
  }

  public getclubs (campusId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/society-clubs`);
  }

  public getclubposts (campusId: number, clubId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/society-clubs/${clubId}/posts`);
  }

  public getclubpost (postId: number): Observable<Object> {
    return this.http.get(`campus/society-clubs/post/${postId}`);
  }
}
