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
  Event,
  EventPost,
  LikeEventPost,
  RateEventPost,
  ReplyEventPost,
  ReportEventPost,
  EventPoll,
  EventVip,
  EventGuest
} from '../models/models';

@Injectable()
export class EventService {
  constructor (private http: HttpClient) {}

  public getEvents (): Observable<Object> {
    return this.http.get('events');
  }

  public getEvent (eventid: number): Observable<Object> {
    return this.http.get(`event/${eventid}`);
  }

  public getEventType (): Observable<Object> {
    return this.http.get('event/event-types');
  }

  public getEventDressCode (): Observable<Object> {
    return this.http.get('event/dress-codes');
  }

  public getGuestList (eventid: number): Observable<Object> {
    return this.http.get(`event/${eventid}/guest-list/`);
  }

  public getVipGuestList (eventid: number): Observable<Object> {
    return this.http.get(`event/${eventid}/vip`);
  }

  public getAuthorEvents (authorid: number): Observable<Object> {
    return this.http.get(`event/my-events`);
  }

  public getPopularEvents (): Observable<Object> {
    // UI Was Excluded from Homepage in this version of the application
    return this.http.get('popularEvents');
  }

  public createpost (eventId: number, post: EventPost): Observable<Object> {
    return this.http.post(`event/${eventId}/post`, post);
  }

  public likepost (postId: number, like: LikeEventPost): Observable<Object> {
    return this.http.post(`event/post/${postId}/like`, like);
  }

  public ratepost (postId: number, rate: RateEventPost): Observable<Object> {
    return this.http.post(`event/post/${postId}/rating`, rate);
  }

  public replypost (postId: number, reply: ReplyEventPost): Observable<Object> {
    return this.http.post(`event/post/${postId}/reply`, reply);
  }

  public reportpost (postId: number, report: ReportEventPost): Observable<Object> {
    return this.http.post(`event/post/${postId}/report`, report);
  }

  public viewpost (postId: number): Observable<Object> {
    return this.http.post(`event/post/${postId}/pageview`, {});
  }

  public createpoll (eventId: number, poll: EventPoll): Observable<Object> {
    return this.http.post(`event/${eventId}/post/poll`, poll);
  }

  public createeventguestlist (eventId: number, guest: EventGuest): Observable<Object> {
    return this.http.post(`event/${eventId}/guest-list`, guest);
  }

  public createeventvip (eventId: number, vip: EventVip): Observable<Object> {
    return this.http.post(`event/${eventId}/vip`, vip);
  }

  public reateevent (event: Event): Observable<Object> {
    return this.http.post(`event`, event);
  }

  public readEvents (events: any[]): Event[] {
    const processedevents: Event[] = [];
    events.forEach(element => {
      const event = new Event();
      event.id = element['event_Id'];
      event.title = element['event_title'];
      event.description = element['event_description'];
      event.venueAddress = element['event_address'];
      event.startdate = element['event_startdate'];
      event.starttime = element['event_starttime'];
      processedevents.push(event);
    });

    return processedevents;
  }
}
