import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
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
export class CanActivateUserProfile implements CanActivate {
  constructor (
    private userService: UserService) {}

  private protectedRoutes = ['home'];

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getLoggedInUser() ? this.userService.getProfile()
      .subscribe((response: UserResponse) => {
        UserClass.setUser(response.user);
        resolve(true);
      }, (error) => {
        this.userService.clearLocalStorage();
        window.location.reload();
      }) : resolve(true);
    });
  }
}
