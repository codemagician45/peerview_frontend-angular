import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'privacy-policy-component',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  constructor (private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'The Peersview Privacy Policy for Applicants gives you an overview of how we collect and process your information.'
    });


  }
}
