import {
  Component,
  OnInit
} from '@angular/core';
import {
  DateAdapter,
  NativeDateAdapter
} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor (
    private dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    this.dateAdapter.setLocale('en-EN');
  }

  public ngOnInit (): void {}
}
