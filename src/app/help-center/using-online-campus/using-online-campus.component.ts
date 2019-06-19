import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'using-online-campus-component',
  templateUrl: './using-online-campus.component.html',
  styleUrls: ['./using-online-campus.component.scss']
})
export class UsingOnlineCampusComponent {
  constructor(@Inject(Window) private window: Window,
              private activedRoute: ActivatedRoute) {


  }


}
