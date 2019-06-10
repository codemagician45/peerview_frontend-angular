import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'terms-of-use-component',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})

export class TermsOfUseComponent {
  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'By using our products and services, you are agreeing to our terms and condition'
    });

  }
}

