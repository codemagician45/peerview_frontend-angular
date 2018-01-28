import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Story, Poll, LikePost, ReplyPost, RatePost, ReportPost, SharePost } from "../models/models";

// import {Observable} from "rxjs/observable";
// import {Forum} from "../models/models";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {

  }
  createpost(message: string) {
    const post = { "message": message };
    return this.http.post(`post`, post);
  }

  createstory(story: Story) {
    return this.http.post(`post/story`, story);
  }

  createpoll(poll: Poll) {
    return this.http.post("post/poll", poll);
  }
  gettopstories() {
    return this.http.get("topStories");
  }
  getallposts() {
    return this.http.get(`posts`);
  }

  getpost(postId: Number) {
    return this.http.get(`post/${postId}`);
  }
  sharepost(postid: number, share: SharePost) {
    return this.http.post(`post/share/${postid}`, share);
  }
  likepost(postId:number, like: LikePost) {
    return this.http.post(`post/${postId}/like`, like);
  }

  replypost(postId: number, reply: ReplyPost) {
    return this.http.post(`post/${postId}/reply`, reply);
  }

  reportpost(postId: number, report: ReportPost) {
    return this.http.post(`post/${postId}/report`, report);
  }

  ratepost(postId: number, rate: RatePost) {
    return this.http.post(`post/${postId}/rating`, rate);
  }

  viewpost(postId: number) {
    return this.http.post(`post/${postId}/pageview`, {});
  }

  getrating(postId: number) {
    return this.http.get(`post/rating/${postId}`);
  }

  getcategoryId(categoryCode: string) {
    return this.http.get(`post/category/${categoryCode}`);
  }

  searchpost(searchkeyword: string) {
    return this.http.get(`advance-search/post?keyword='${searchkeyword}'`);
  }
}
