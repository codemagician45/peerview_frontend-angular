import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {Event, EventPost, LikeEventPost, RateEventPost, ReplyEventPost, ReportEventPost, EventPoll, EventVip, EventGuest} from "../models/models";

@Injectable()
export class EventService {
    constructor(private http: HttpClient) {
    }

    getEvents() {
        return this.http.get("events");
    }

    getEvent(eventid: number){
        return this.http.get(`event/${eventid}`);
    }

    getEventType() {
        return this.http.get("event/event-types");
    }

    getEventDressCode() {
        return this.http.get("event/dress-codes");
    }

    getGuestList(eventid: number) {
        return this.http.get(`event/${eventid}/guest-list/`);
    }

    getVipGuestList(eventid: number) {
        return this.http.get(`event/${eventid}/vip`);
    }

    getAuthorEvents(authorid: number) {
        return this.http.get(`event/my-events`);
    }

    getPopularEvents() {
        // UI Was Excluded from Homepage in this version of the application
        return this.http.get("popularEvents");
    }
    
    readEvents(events: any[]): Event [] {
        const processedevents: Event[] = [];
        events.forEach(element => {
            const event = new Event();
            event.id = element["event_Id"];
            event.title = element["event_title"];
            event.description = element["event_description"];
            event.venueAddress = element["event_address"];
            event.startdate = element["event_startdate"];
            event.starttime = element["event_starttime"];
            processedevents.push(event);
        });
        return processedevents;

    }

    createpost(eventId:number, post:EventPost){
        return this.http.post(`event/${eventId}/post`, post);
    }

    likepost(postId:number, like:LikeEventPost){
        return this.http.post(`event/post/${postId}/like`, like)
    }

    ratepost(postId:number, rate:RateEventPost){
        return this.http.post(`event/post/${postId}/rating`, rate);
    }

    replypost(postId:number, reply: ReplyEventPost){
        return this.http.post(`event/post/${postId}/reply`, reply);
    }

    reportpost(postId:number, report: ReportEventPost){
        return this.http.post(`event/post/${postId}/report`, report);
    }

    viewpost(postId:number) {
        return this.http.post(`event/post/${postId}/pageview`, {});
    }

    createpoll(eventId:number, poll: EventPoll) {
        return this.http.post(`event/${eventId}/post/poll`, poll);
    }

    createeventguestlist(eventId:number, guest: EventGuest){
        return this.http.post(`event/${eventId}/guest-list`, guest);
    }

    createeventvip(eventId:number, vip: EventVip) {
        return this.http.post(`event/${eventId}/vip`, vip);
    }

    createevent(event: Event) {
        return this.http.post(`event`, event);
    }
}
