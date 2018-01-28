import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LikeCampusStudentGroupPost, ReplyCampusStudentGroupPost, ReportCampusStudentGroupPost, RateCampusStudentGroupPost, CampusStudentGroupPoll, CampusStudentGroupPost, CampusStudentGroup, CampusStudentGroupBrainstormingMap } from "../models/models";

@Injectable()
export class CampusStudentGroupService {
    constructor(private http:HttpClient){
    }
    likepost(postid: number, like:LikeCampusStudentGroupPost) {
        return this.http.post(`campus/student-group/post/${postid}/like`, like);
     }
    
      replypost(postId:number, reply:ReplyCampusStudentGroupPost) {
        return this.http.post(`campus/student-group/post/${postId}/reply`, reply);
      }
    
     reportpost(postId:number, report:ReportCampusStudentGroupPost) {
        return this.http.post(`campus/student-group/post/${postId}/report`, report);
      }
    
      ratepost(postId:number, rate:RateCampusStudentGroupPost) {
        return this.http.post(`campus/student-group/post/${postId}/rating`, rate);
      }
    
      viewpost(postId:number) {
        return this.http.post(`campus/student-group/post/${postId}/pageview`, {});
      }
 
      createpoll(campusId:number, poll: CampusStudentGroupPoll){
        return this.http.post(`campus/student-group/${campusId}/post/poll`, poll);
      }
 
      createpost(campusId:number, post:CampusStudentGroupPost){
        return this.http.post(`campus/student-group/${campusId}/post`, post);
      }

      createsocietyclub(campusId:number, societyclub: CampusStudentGroup){
          return this.http.post(`campus/${campusId}/student-group`, societyclub);
      }

      createbrainstormingmap(campusId:number, groupId:number, map:CampusStudentGroupBrainstormingMap){
          return this.http.post(`campus/${campusId}/student-group/${groupId}/post/brainstorming`, map);
      }

      getgroups(campusId: number) {
        return this.http.get(`campus/${campusId}/student-groups`);
      }

      getgroupposts(campusId:number, groupId: number) {
        return this.http.get(`campus/${campusId}/student-group/${groupId}/posts`);
      }

      getgrouppost(postId: number){
        return this.http.get(`campus/student-group/post/${postId}`);
      }
}