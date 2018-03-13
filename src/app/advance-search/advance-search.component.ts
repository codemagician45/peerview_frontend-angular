import {
  Component
} from '@angular/core';

@Component({
  selector: 'advance-search-component',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent {
  constructor () {}

  protected findPeople: boolean = true;
}
