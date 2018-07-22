import {
  Component,
  OnInit
} from '@angular/core';
import {
  CampusApiService
} from '../../services/api/campus.api.service';

@Component({
   selector: 'community-component',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {
  constructor (private campusApiService: CampusApiService) {}

  public ngOnInit (): void {
    this.campusApiService.getCampuses()
      .then((response) => {
        console.log(response);
      });
  }
}
