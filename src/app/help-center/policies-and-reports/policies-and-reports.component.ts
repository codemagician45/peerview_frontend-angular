import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'policies-and-reports-component',
  templateUrl: './policies-and-reports.component.html',
  styleUrls: ['./policies-and-reports.component.scss']
})
export class PoliciesAndReportsComponent {
  constructor(@Inject(Window) private window: Window,
              private activedRoute: ActivatedRoute) {


  }


}
