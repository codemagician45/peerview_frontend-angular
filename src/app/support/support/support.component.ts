import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  public header = 'How can we help?';
  public sub_header = 'Get answers for the most common questions';
  protected navName: string = 'support';

  public ngOnInit (): void {
    this.route
      .data
      .subscribe(data => {
        this.navName = data['name'];
      });
  }
}
