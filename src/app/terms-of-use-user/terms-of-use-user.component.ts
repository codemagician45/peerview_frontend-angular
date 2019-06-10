import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'terms-of-use-user-component',
  templateUrl: './terms-of-use-user.component.html',
  styleUrls: ['./terms-of-use-user.component.scss']
})
export class TermsOfUseUserComponent {
  constructor( private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Terms for using our Digital campus'
    });


  }
}
