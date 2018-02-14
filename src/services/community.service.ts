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
  LikeCommunityPost,
  Community,
  ReplyCommunityPost,
  ReportCommunityPost,
  RateCommunityPost,
  CommunityPoll,
  CommunityPost,
  CommunityCareer,
  CommunityBrainstormingMap
} from '../models/models';
import {
  UserClass
} from '../app/shared/classes';

@Injectable()
export class CommunityService {
  constructor (private http: HttpClient) {}

  public getjob (id: Number): Observable<Object> {
    return this.http.get(`job/${id}`);
  }

  public getjobs (campusId: Number = 1): Observable<Object> {
    return this.http.get(`campus/${campusId}/jobs`);
  }

  public createsellerad (campusId: number, item: any): Observable<Object> {
    return this.http.post(`campus/${campusId}/marketplace`, item);
  }

  public getuserclubs (campusId: Number = 1): Observable<Object> {
    return this.http.get(`campus/${campusId}/society-clubs?isMyClub=true`);
  }

  public getsocietyclubs (instituteId: Number = 1): Observable<Object> {
    return this.http.get(`campus/${instituteId}/society-clubs`);
  }

  public followclub (clubid: Number): Observable<Object> {
    return this.http.post(`socitiesclubs/user/follow/`, { 'socitiesclubsId': clubid });
  }

  public unfollowclub (clubid: Number): Observable<Object> {
    return this.http.post(`socitiesclubs/user/unfollow/`, { 'socitiesclubsId': clubid });
  }

  public creategroup (group: any): Observable<Object> {
    group.instituteId = 1;
    return this.http.post('groups', group);
  }

  public createcommunity (community: Community): Observable<Object> {
    return this.http.post('community', community);
  }

  public likepost (postid: number, like: LikeCommunityPost): Observable<Object> {
    return this.http.post(`community/post/${postid}/like`, like);
  }

  public replypost (postId: number, reply: ReplyCommunityPost): Observable<Object> {
    return this.http.post(`community/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportCommunityPost): Observable<Object> {
    return this.http.post(`community/post/${postId}/report`, report);
  }

  public ratepost (postId: number, rate: RateCommunityPost): Observable<Object> {
    return this.http.post(`community/post/${postId}/rating`, rate);
  }

  public postviewpost (postId: number): Observable<Object> {
    return this.http.post(`community/post/${postId}/pageview`, {});
  }

  public createpoll (communityId: number, poll: CommunityPoll): Observable<Object> {
    return this.http.post(`community/${communityId}/post/poll`, poll);
  }

  public createpost (communityId: number, post: CommunityPost): Observable<Object> {
    return this.http.post(`community/${communityId}/post`, post);
  }

  // TO-DO No difference in endpoint or method description for private post

  public createcareer (career: CommunityCareer): Observable<Object> {
    return this.http.post('community/post/career', career);
  }

  public createbrainstormingmap (communityId: number, map: CommunityBrainstormingMap): Observable<Object> {
    return this.http.post(`community/${communityId}/post/brainstorming`, map);
  }

  // TO-DO use params for query string
  public getposts (communityId: number, userStudyLevelId: number, courseId: number): Observable<Object> {
    return this.http.get(`community/${communityId}/posts`);
  }

  public getpost (postId: number): Observable<Object> {
    return this.http.get(`community/post/${postId}`);
  }

  public getprivateposts (communityId: number): Observable<Object> {
    return this.http.get(`community/${communityId}/posts?isprivate=true`);
  }

  public getcareerposts (): Observable<Object> {
    return this.http.get(`community/career/posts`);
  }

  public updatebrainstormingmap (communityPostId: number, map: CommunityBrainstormingMap): Observable<Object> {
    return this.http.post(`community/${communityPostId}/post/brainstorming`, map);
  }

  public getPosts (): Observable<Object> {
    return this.http.get(`community/posts`);
  }

  public post (message: string): Observable<Object> {
    console.log('messageeeeeeeeeeeeeeeee');
    console.log(message);
    return this.http.post(`community/post`, {message: message});
  }
}
