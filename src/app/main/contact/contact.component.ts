import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  protected navName: string = 'contact';

  public ngOnInit (): void {
    this.route
    .data
    .subscribe((data: any) => {
      this.navName = data['name'];
    });
  }
}
