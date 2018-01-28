import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {BrainStorming, CampusCourseClassPoll, ReplyCampusCourseClassPost, ReportCampusCourseClassPost, CampusCourseClassPost} from "../models/models";

@Injectable()
export class CampusCourseClassService {
    constructor(private http:HttpClient){
    }

    createbrainstormingmap(campusId:number, classId:number, brainstormingmap: BrainStorming){
        return this.http.post(`campus/${campusId}/course/class/${classId}/post/brainstorming`, {'message':brainstormingmap});
    }

    likepost(postId:number){
        return this.http.post(`campus/course/class/post/${postId}/like`, {});
    }

    pageviewpost(postId: number) {
        return this.http.post(`campus/course/class/post/${postId}/pageview`, {});
    }

    createpoll(campusId:number, classId:number, poll: CampusCourseClassPoll) {
        return this.http.post(`campus/${campusId}/course/class/${classId}/post/poll`, poll);
    }
    
    //TO-DO Inform post value missing from description
    ratepost(postId: number){
        return this.http.post(`campus/course/class/post/${postId}/rating`, {});
    }

    replypost(postId: number, reply:ReplyCampusCourseClassPost){
        return this.http.post(`campus/course/class/post/${postId}/reply`, reply);
    }

    reportpost(postId: number, report:ReportCampusCourseClassPost){
        return this.http.post(`campus/course/class/post/${postId}/report`, report);
    }

    createpost(campusId:number, classId:number, post: CampusCourseClassPost) {
        return this.http.post(`campus/${campusId}/course/class/${classId}/post`, post);
    }

    getposts(campusId:number, classId:number) {
        return this.http.get(`campus/${campusId}/course/class/${classId}/posts`);
    }

    getpost(postId:number) {
        return this.http.get(`campus/course/class/post/${postId}`);
    }

    getusercourse(campusId: number){
        return this.http.get(`campus/${campusId}/user/course/classes`);
    }
}