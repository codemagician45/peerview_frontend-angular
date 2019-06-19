import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'network-administrator-component',
  templateUrl: './network-administrator.component.html',
  styleUrls: ['./network-administrator.component.scss']
})
export class NetworkAdministratorComponent {
  constructor (@Inject(Window) private window: Window,
              private activedRoute: ActivatedRoute) {


  }


}
