import {
  Component,
  OnInit
} from '@angular/core';
import {
  CourseService,
  EventService
} from '../../../services/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  constructor (
    private courseService: CourseService,
    private _eventservice: EventService
  ) {}

  public cities: any;
  public city: any = '';
  public eventtypes: any = [];
  public dresstypes: any = [];

  public ngOnInit (): void {
    this.courseService.getCountryCities()
    .subscribe((response: any) => {
      this.cities = _.orderBy(response['cities'], ['name'], ['asc']);
    });

    this._eventservice.getEventType()
    .subscribe((response: any) => {
      this.eventtypes = response.eventTypes;
    });

    this._eventservice.getEventDressCode()
    .subscribe((response: any) => {
      this.dresstypes = response.eventDressCodes;
    });
  }
}
