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
  LikeCampusStudentGroupPost,
  ReplyCampusStudentGroupPost,
  ReportCampusStudentGroupPost,
  RateCampusStudentGroupPost,
  CampusStudentGroupPoll,
  CampusStudentGroupPost,
  CampusStudentGroup,
  CampusStudentGroupBrainstormingMap
} from '../models/models';

@Injectable()
export class CampusStudentGroupService {
  constructor (private http: HttpClient) {}

  public likepost (postid: number, like: LikeCampusStudentGroupPost): Observable<Object> {
    return this.http.post(`campus/student-group/post/${postid}/like`, like);
  }

  public replypost (postId: number, reply: ReplyCampusStudentGroupPost): Observable<Object>  {
    return this.http.post(`campus/student-group/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCampusStudentGroupPost): Observable<Object>  {
    return this.http.post(`campus/student-group/post/${postId}/report`, report);
  }

  public ratepost (postId: number, rate: RateCampusStudentGroupPost): Observable<Object>  {
    return this.http.post(`campus/student-group/post/${postId}/rating`, rate);
  }

  public viewpost (postId: number): Observable<Object>  {
    return this.http.post(`campus/student-group/post/${postId}/pageview`, {});
  }

  public createpoll (campusId: number, poll: CampusStudentGroupPoll): Observable<Object>  {
    return this.http.post(`campus/student-group/${campusId}/post/poll`, poll);
  }

  public createpost (campusId: number, post: CampusStudentGroupPost): Observable<Object>  {
    return this.http.post(`campus/student-group/${campusId}/post`, post);
  }

  public createsocietyclub (campusId: number, societyclub: CampusStudentGroup): Observable<Object>  {
    return this.http.post(`campus/${campusId}/student-group`, societyclub);
  }

  public createbrainstormingmap (campusId: number, groupId: number, map: CampusStudentGroupBrainstormingMap): Observable<Object>  {
    return this.http.post(`campus/${campusId}/student-group/${groupId}/post/brainstorming`, map);
  }

  public getgroups (campusId: number): Observable<Object>  {
    return this.http.get(`campus/${campusId}/student-groups`);
  }

  public getgroupposts (campusId: number, groupId: number): Observable<Object>  {
    return this.http.get(`campus/${campusId}/student-group/${groupId}/posts`);
  }

  public getgrouppost (postId: number): Observable<Object>  {
    return this.http.get(`campus/student-group/post/${postId}`);
  }
}
