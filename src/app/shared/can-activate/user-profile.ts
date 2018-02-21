import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router
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
    private userService: UserService,
    private router: Router) {}

  public canActivate (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      /**
       * check if twe have token so that we can call
       * getProfile directly
       */
      if (!this.userService.getLoggedInUser()) {
        this.router.navigate(['/sign-in']);

        return resolve(true);
      }

      this.userService.getProfile()
      .subscribe((response: UserResponse) => {
        UserClass.setUser(response.user);

        resolve(true);
      }, () => {
        reject(false);
      });
    });
  }
}
