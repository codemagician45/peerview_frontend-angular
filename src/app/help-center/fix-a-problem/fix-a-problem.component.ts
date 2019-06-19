import {
  Component,
  Inject,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'fix-a-problem-component',
  templateUrl: './fix-a-problem.component.html',
  styleUrls: ['./fix-a-problem.component.scss']
})
export class FixAProblemComponent {
  constructor(@Inject(Window) private window: Window,
    private activedRoute: ActivatedRoute) {


  }


}
