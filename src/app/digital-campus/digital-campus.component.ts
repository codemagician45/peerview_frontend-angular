import {
  Component
} from '@angular/core';

@Component({
  selector: 'digital-campus-component',
  templateUrl: './digital-campus.component.html',
  styleUrls: ['./digital-campus.component.scss']
})
export class DigitalCampusComponent {
  constructor () {}

  protected section: string = 'institutions';
}
