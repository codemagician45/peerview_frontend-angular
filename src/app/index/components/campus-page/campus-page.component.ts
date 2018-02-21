import {
  Component
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'index-campus-page-component',
  templateUrl: './campus-page.component.html',
  styleUrls: ['./campus-page.component.scss']
})
export class IndexCampusPageComponent {
  constructor () {}

  protected section: string = 'students';
}
