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
  LikeCampusCoursePost,
  CampusCoursePoll,
  RateCampusCoursePost,
  ReplyCampusCoursePost,
  ReportCampusCoursePost,
  CampusCoursePost
} from '../models/models';

@Injectable()
export class CampusCourseService {
  constructor (private http: HttpClient) {}

  public likepost (postId: number, like: LikeCampusCoursePost): Observable<Object> {
    return this.http.post(`campus/course/post/${postId}/like`, like);
  }

  public pageviewpost (postId: number): Observable<Object> {
    return this.http.post(`campus/course/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, classId: number, poll: CampusCoursePoll): Observable<Object> {
    return this.http.post(`campus/${campusId}/course/${classId}/post/poll`, poll);
  }

  // TO-DO Inform post value missing from description
  public ratepost (postId: number, rate: RateCampusCoursePost): Observable<Object> {
    return this.http.post(`campus/course/post/${postId}/rating`, {});
  }

  public replypost (postId: number, reply: ReplyCampusCoursePost): Observable<Object> {
    return this.http.post(`campus/course/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusCoursePost): Observable<Object> {
    return this.http.post(`campus/course/post/${postId}/report`, report);
  }

  public createpost (campusId: number, classId: number, post: CampusCoursePost): Observable<Object> {
    return this.http.post(`campus/${campusId}/course/${classId}/post`, post);
  }

  public getposts (campusId: number, courseId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/course/${courseId}/posts`);
  }

  public getpost (postId: number): Observable<Object> {
    return this.http.get(`campus/course/post/${postId}`);
  }
}
