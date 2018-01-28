import {Component, OnInit} from "@angular/core";
import {EventService, UserService} from "../../../services/services";
import {Event} from "../../../models/models";
@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {

    constructor(private _eventservice: EventService, private _userservice: UserService) {
    }
    events: Event[] = [];
    ngOnInit() {
        this._eventservice.getAuthorEvents(this._userservice.loggedInUser ? this._userservice.loggedInUser.id : 0).subscribe(
            resp => {
                this.events = resp["events"];
            }, error => {
                console.log(error);
            }

        );
    }

}
