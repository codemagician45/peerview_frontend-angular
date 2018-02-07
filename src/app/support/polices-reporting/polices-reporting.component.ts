import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-polices-reporting',
  templateUrl: './polices-reporting.component.html',
  styleUrls: ['./polices-reporting.component.scss']
})
export class PolicesReportingComponent implements OnInit {
  constructor () {}

  public header = 'Policies and Reporting';
  public sub_header = '';

  public ngOnInit (): void {}
}
