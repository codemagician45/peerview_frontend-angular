import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-buisnes-organization',
  templateUrl: './buisnes-organization.component.html',
  styleUrls: ['./buisnes-organization.component.scss']
})
export class BuisnesOrganizationComponent implements OnInit {
  constructor () {}

  public sub_header = '';
  public header = 'Business Organisations';

  public ngOnInit (): void {}
}
