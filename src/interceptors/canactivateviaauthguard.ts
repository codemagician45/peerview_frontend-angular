import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import {
  UserService,
  AuthenticationService
} from '../services/services';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor (
    private userService: UserService,
    private authenticationservice: AuthenticationService,
    private router: Router) {}

  public canActivate (): boolean {
    let isAuthenticated = this.userService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/sign-in']);
      return false;
    } else {
      return true;
    }
  }
}
