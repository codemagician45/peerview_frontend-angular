import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventService,
  UserService
} from '../../../services/services';
import {
  Event
} from '../../../models/models';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  constructor (
    private _eventservice: EventService,
    private _userservice: UserService
  ) {}

  protected events: Event[] = [];

  public ngOnInit (): void {
    this._eventservice.getAuthorEvents(this._userservice.loggedInUser ? this._userservice.loggedInUser.id : 0)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
