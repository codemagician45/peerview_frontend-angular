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
    private eventService: EventService,
    private userService: UserService
  ) {}

  protected events: Event[] = [];

  public ngOnInit (): void {
    // this.eventService.getAuthorEvents(this.userService.loggedInUser ? this.userService.loggedInUser.id : 0)
    // .subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.log(error);
    // });
  }
}
