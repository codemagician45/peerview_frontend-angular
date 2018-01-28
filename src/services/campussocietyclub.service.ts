import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LikeCampusSocietyClubPost, ReplyCampusSocietyClubPost, ReportCampusSocietyClubPost, RateCampusSocietyClubPost, CampusCourseClassPost, CampusSocietyClubPost, CampusSocietyClub } from "../models/models";


@Injectable()
export class CampusSocietyClubService {
    constructor(private http:HttpClient) {
    }

    likepost(postid: number, like:LikeCampusSocietyClubPost) {
        return this.http.post(`campus/society-club/post/${postid}/like`, like);
     }
    
      replypost(postId:number, reply:ReplyCampusSocietyClubPost) {
        return this.http.post(`campus/society-club/post/${postId}/reply`, reply);
      }
    
     reportpost(postId:number, report:ReportCampusSocietyClubPost) {
        return this.http.post(`campus/society-club/post/${postId}/report`, report);
      }
    
      ratepost(postId:number, rate:RateCampusSocietyClubPost) {
        return this.http.post(`campus/society-club/post/${postId}/rating`, rate);
      }
    
      viewpost(postId:number) {
        return this.http.post(`campus/society-club/post/${postId}/pageview`, {});
      }
 
      createpoll(campusId:number, poll: CampusCourseClassPost){
        return this.http.post(`campus/society-club/${campusId}/post/poll`, poll);
      }
 
      createpost(campusId:number, post:CampusSocietyClubPost){
        return this.http.post(`campus/society-club/${campusId}/post`, post);
      }

      createsocietyclub(campusId:number, societyclub: CampusSocietyClub){
          return this.http.post(`campus/${campusId}/society-club`, societyclub);
      }

      getclubs(campusId: number) {
        return this.http.get(`campus/${campusId}/society-clubs`);
      }

      getclubposts(campusId:number, clubId: number) {
        return this.http.get(`campus/${campusId}/society-clubs/${clubId}/posts`);
      }

      getclubpost(postId: number){
        return this.http.get(`campus/society-clubs/post/${postId}`);
      }
}