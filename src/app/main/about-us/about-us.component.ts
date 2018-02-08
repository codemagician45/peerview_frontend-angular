import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  protected navName: string = 'about-us';

  public ngOnInit (): void {
    this.route
    .data
    .subscribe(data => {
      this.navName = data['name'];
    });
  }
}
