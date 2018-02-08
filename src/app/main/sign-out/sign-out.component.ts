import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserService
} from '../../../services/services';

@Component({
  selector: 'app-sign-out',
  template: ''
})
export class SignOutComponent implements OnInit {
  constructor (
    private userservice: UserService,
    private router: Router
  ) {}

  public ngOnInit (): void {
    this.userservice.logoutuser();
    this.router.navigate(['/']);
  }
}
