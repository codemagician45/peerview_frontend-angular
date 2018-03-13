import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  UserService,
} from '../../../services';
import {
  UserResponse
} from '../models';
import {
  UserClass
} from '../classes';

@Injectable()
export class IsProtectedCompnent implements CanActivate {
  constructor (
    private userService: UserService,
    private router: Router) {}

  private protectedRoutes = ['home'];

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(route);
      if (!this.userService.getLoggedInUser() && route.data.isProtected) {
        this.router.navigate(['/sign-in']);
      } else if (this.userService.getLoggedInUser() && !route.data.isProtected) {
        this.router.navigate(['/home']);
      }

      return resolve(true);
    });
  }
}
