import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {LikeCampusCoursePost, CampusCoursePoll, RateCampusCoursePost, ReplyCampusCoursePost, ReportCampusCoursePost, CampusCoursePost} from "../models/models";

@Injectable()
export class CampusCourseService {
    constructor(private http:HttpClient){
    }

    likepost(postId:number, like:LikeCampusCoursePost){
        return this.http.post(`campus/course/post/${postId}/like`, like);
    }

    pageviewpost(postId: number) {
        return this.http.post(`campus/course/post/${postId}/pageview`, {});
    }

    createpoll(campusId:number, classId:number, poll: CampusCoursePoll) {
        return this.http.post(`campus/${campusId}/course/${classId}/post/poll`, poll);
    }
    
    //TO-DO Inform post value missing from description
    ratepost (postId: number, rate: RateCampusCoursePost){
        return this.http.post(`campus/course/post/${postId}/rating`, {});
    }

    replypost(postId: number, reply:ReplyCampusCoursePost){
        return this.http.post(`campus/course/post/${postId}/reply`, reply);
    }

    reportpost(postId: number, report:ReportCampusCoursePost){
        return this.http.post(`campus/course/post/${postId}/report`, report);
    }

    createpost(campusId:number, classId:number, post: CampusCoursePost) {
        return this.http.post(`campus/${campusId}/course/${classId}/post`, post);
    }

    getposts(campusId:number, courseId:number) {
        return this.http.get(`campus/${campusId}/course/${courseId}/posts`);
    }

    getpost(postId:number) {
        return this.http.get(`campus/course/post/${postId}`);
    }
}