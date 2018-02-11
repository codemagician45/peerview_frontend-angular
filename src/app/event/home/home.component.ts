import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  EventService,
  CourseService
} from '../../../services/services';
import {
  Event
} from '../../../models/models';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor (
    private eventService: EventService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.items = [1, 2, 3, 4, 5, 6, 7, 8];
    this.properties = {
      items: window.innerWidth > 480 ? 8 : 4,
      loop: true,
      dots: false,
      nav: true,
      onChange: function (): void {}
    };
  }

  public items: any;
  public properties: any;
  protected events: Event[] = [];
  protected canadiancities: any[] = [];
  protected cityid: Number;
  protected date: any = new Date();

  public ngOnInit (): void {
    this.eventService.getEvents().subscribe((response: any) => {
      this.events = response.events;
    }, error => {
      console.log(error);
    });

    this.route.queryParamMap
    .map(params => params.get('id') || '')
    .subscribe(param => {
      this.cityid = Number(param);
    });

    this.courseService.getCountryCities()
    .subscribe((response: any) => {
      this.canadiancities = _.orderBy(response['cities'], ['name'], ['asc']);
    });
  }
}
