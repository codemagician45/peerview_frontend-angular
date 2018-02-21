import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'shared-navbar-unauth-component',
  templateUrl: './navbar-unauth.component.html',
  styleUrls: ['./navbar-unauth.component.scss']
})
export class SharedNavbarUnauthComponent {
  constructor () {}

  @Input() protected signInOrSignUp: string;
}
