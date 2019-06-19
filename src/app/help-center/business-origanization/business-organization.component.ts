import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'business-organization-component',
  templateUrl: './business-organization.component.html',
  styleUrls: ['./business-organization.component.scss']
})
export class BusinessOrganizationComponent {
  constructor (@Inject(Window) private window: Window,
              private activedRoute: ActivatedRoute) {

  }

}
