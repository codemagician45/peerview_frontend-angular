import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LikeCampusPost, CampusPoll, RateCampusPost, ReplyCampusPost, ReportCampusPost, CampusPost, CampusMarketPlace } from "../models/models";

@Injectable()
export class CampusService {
    constructor(private http:HttpClient) {
    }

    getfreshersfeedpost(campusId:Number = 1, freshersFeedId: Number=1){
        return this.http.get(`campus/${campusId}/freshers-feed/${freshersFeedId}/posts`);
    }

    getcampusposts(campusId: Number){
       return this.http.get(`campus/${campusId}/posts`)
    }
    sharepost(postid: number, share: any) {
        return this.http.post(`post/share/${postid}`, share);
    }

    likepost(postid: number, like:LikeCampusPost) {
       return this.http.post(`campus/post/${postid}/like`, like);
    }
   
     replypost(postId:number, reply:ReplyCampusPost) {
       return this.http.post(`campus/post/${postId}/reply`, reply);
     }
   
    reportpost(postId:number, report:ReportCampusPost) {
       return this.http.post(`campus/post/${postId}/report`, report);
     }
   
     ratepost(postId:number, rate:RateCampusPost) {
       return this.http.post(`campus/post/${postId}/rating`, rate);
     }
   
     postviewpost(postId:number) {
       return this.http.post(`campus/post/${postId}/pageview`, {});
     }

     createpoll(campusId:number, poll: CampusPoll){
       return this.http.post(`campus/${campusId}/post/poll`, poll);
     }

     createpost(campusId:number, post:CampusPost){
       return this.http.post(`campus/${campusId}/post`, post);
     }

     getcampuspost(postId: number){
       return this.http.get(`campus/post/${postId}`);
     }

     getjob(jobId:number) {
       return this.http.get(`campus/job/${jobId}`);
     }

     createmarketplace(campusId: number, market: CampusMarketPlace){
       return this.http.post(`campus/${campusId}/marketplace`, market)
     }

     createuserclasses(campusCourseClassIds: number[]) {
       return this.http.post("campus/user/classes", campusCourseClassIds);
     }
}