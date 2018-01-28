import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import { LikeCommunityPost, Community, ReplyCommunityPost, ReportCommunityPost, RateCommunityPost, CommunityPoll, CommunityPost, CommunityCareer, CommunityBrainstormingMap } from "../models/models";

@Injectable()
export class CommunityService {
    constructor(private http: HttpClient) {}

    getjob(id: Number) {
        return this.http.get(`job/${id}`);
    }

    getjobs(campusId: Number=1) {
        return this.http.get(`campus/${campusId}/jobs`)
    }
    createsellerad(campusId:number, item: any) {
        return this.http.post(`campus/${campusId}/marketplace`, item);
    }

    getuserclubs(campusId: Number = 1) {
        return this.http.get(`campus/${campusId}/society-clubs?isMyClub=true`);
    }

    getsocietyclubs(instituteId: Number=1) {
        return this.http.get(`campus/${instituteId}/society-clubs`);
    }


    followclub(clubid: Number) {
        return this.http.post(`socitiesclubs/user/follow/`, {"socitiesclubsId": clubid});
    }

    unfollowclub(clubid: Number) {
        return this.http.post(`socitiesclubs/user/unfollow/`, {"socitiesclubsId": clubid});
    }

    creategroup(group: any) {
        group.instituteId = 1;
        return this.http.post("groups", group);
    }

    createcommunity(community: Community){
        return this.http.post(`community`, community)
    }

    likepost(postid: number, like:LikeCommunityPost) {
        return this.http.post(`community/post/${postid}/like`, like);
     }
    
      replypost(postId:number, reply:ReplyCommunityPost) {
        return this.http.post(`community/post/${postId}/reply`, reply);
      }
    
     reportpost(postId:number, report:ReportCommunityPost) {
        return this.http.post(`community/post/${postId}/report`, report);
      }
    
      ratepost(postId:number, rate:RateCommunityPost) {
        return this.http.post(`community/post/${postId}/rating`, rate);
      }
    
      postviewpost(postId:number) {
        return this.http.post(`community/post/${postId}/pageview`, {});
      }
 
      createpoll(communityId:number, poll: CommunityPoll){
        return this.http.post(`community/${communityId}/post/poll`, poll);
      }
 
      createpost(communityId:number, post:CommunityPost){
        return this.http.post(`community/${communityId}/post`, post);
      }

      //TO-DO No difference in endpoint or method description for private post

      createcareer(career: CommunityCareer){
            return this.http.post("community/post/career", career);
      }

      createbrainstormingmap(communityId:number, map: CommunityBrainstormingMap){
          return this.http.post(`community/${communityId}/post/brainstorming`, map);
      }

      //TO-DO use params for query string
      getposts(communityId:number, userStudyLevelId:number, courseId:number) {
        return this.http.get(`community/${communityId}/posts`);
      }

      getpost(postId:number) {
        return this.http.get(`community/post/${postId}`);
      }

      getprivateposts(communityId:number) {
        return this.http.get(`community/${communityId}/posts?isprivate=true`);
      }

      getcareerposts() {
        return this.http.get(`community/career/posts`);
      }

      updatebrainstormingmap(communityPostId:number, map: CommunityBrainstormingMap){
        return this.http.post(`community/${communityPostId}/post/brainstorming`, map);
      }
}
