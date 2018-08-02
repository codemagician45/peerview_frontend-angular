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
  TokenStore
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
    private router: Router) {}

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!TokenStore.getAccessToken() && route.data.isProtected) {
        this.router.navigate(['/sign-in']);
      } else if (TokenStore.getAccessToken() && !route.data.isProtected) {
        this.router.navigate(['/home']);
      }

      return resolve(true);
    });
  }
}
