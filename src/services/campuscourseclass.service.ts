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
  BrainStorming,
  CampusCourseClassPoll,
  ReplyCampusCourseClassPost,
  ReportCampusCourseClassPost,
  CampusCourseClassPost
} from '../models/models';

@Injectable()
export class CampusCourseClassService {
  constructor (private http: HttpClient) {}

  public createbrainstormingmap (campusId: number, classId: number, brainstormingmap: BrainStorming): Observable<Object> {
    return this.http.post(`campus/${campusId}/course/class/${classId}/post/brainstorming`, { 'message': brainstormingmap });
  }

  public likepost (postId: number): Observable<Object> {
    return this.http.post(`campus/course/class/post/${postId}/like`, {});
  }

  public pageviewpost (postId: number): Observable<Object> {
    return this.http.post(`campus/course/class/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, classId: number, poll: CampusCourseClassPoll): Observable<Object> {
    return this.http.post(`campus/${campusId}/course/class/${classId}/post/poll`, poll);
  }

  // TO-DO Inform post value missing from description
  public ratepost (postId: number): Observable<Object> {
    return this.http.post(`campus/course/class/post/${postId}/rating`, {});
  }

  public replypost (postId: number, reply: ReplyCampusCourseClassPost): Observable<Object> {
    return this.http.post(`campus/course/class/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusCourseClassPost): Observable<Object> {
    return this.http.post(`campus/course/class/post/${postId}/report`, report);
  }

  public createpost (campusId: number, classId: number, post: CampusCourseClassPost): Observable<Object> {
    return this.http.post(`campus/${campusId}/course/class/${classId}/post`, post);
  }

  public getposts (campusId: number, classId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/course/class/${classId}/posts`);
  }

  public getpost (postId: number): Observable<Object> {
    return this.http.get(`campus/course/class/post/${postId}`);
  }

  public getusercourse (campusId: number): Observable<Object> {
    return this.http.get(`campus/${campusId}/user/course/classes`);
  }
}
