import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";




@Injectable()
export class NotificationService {
    constructor(private http: HttpClient) {

    }
    getNotifications(start: number, size: number) {
       return this.http.get(`notifications/${start}/${size}`);
    }
    getMessages(start: number, size: number) {
        return this.http.get(`message/headers/${start}/${size}`);
     }
}
