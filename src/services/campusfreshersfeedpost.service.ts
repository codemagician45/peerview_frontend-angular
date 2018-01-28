import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CampusFreshersFeedPoll, LikeCampusFreshersFeedPost, ReplyCampusFreshersFeedPost, ReportCampusFreshersFeedPost, CampusFreshersFeedPost } from "../models/models";

@Injectable()
export class CampusFreshersFeedPostService {
    constructor(private http: HttpClient) {
    }

    likepost(postId: number, like: LikeCampusFreshersFeedPost) {
        return this.http.post(`campus/freshers-feed/post/${postId}/like`, like);
    }

    pageviewpost(postId: number) {
        return this.http.post(`campus/freshers-feed/post/${postId}/pageview`, {});
    }

    createpoll(campusId: number, freshersFeedId: number, poll: CampusFreshersFeedPoll) {
        return this.http.post(`campus/${campusId}/freshers-feed/${freshersFeedId}/post/poll`, poll);
    }

    //TO-DO Inform post value missing from description
    ratepost(postId: number) {
        return this.http.post(`campus/freshers-feed/post/${postId}/rating`, {});
    }

    replypost(postId: number, reply: ReplyCampusFreshersFeedPost) {
        return this.http.post(`campus/freshers-feed/post/${postId}/reply`, reply);
    }

    reportpost(postId: number, report: ReportCampusFreshersFeedPost) {
        return this.http.post(`campus/freshers-feed/post/${postId}/report`, report);
    }

    createpost(campusId: number, freshersFeedId: number, post: CampusFreshersFeedPost) {
        return this.http.post(`campus/${campusId}/freshers-feed/${freshersFeedId}/post`, post);
    }

    getfeed(campusId: number) {
        return this.http.get(`campus/${campusId}/freshers-feed`);
    }

    getfeedposts(campusId: number, feedId: number) {
        return this.http.get(`campus/${campusId}/freshers-feed/${feedId}/posts`);
    }

    getfeedpost(postId: number) {
        return this.http.get(`campus/freshers-feed/post/${postId}`);
    }
}