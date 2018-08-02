import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  UserApiService,
} from '../../../services/api';
import {
  TokenStore
} from '../../../services';
import {
  UserModel
} from '../models';
import {
  UserClass
} from '../classes';

@Injectable()
export class CanActivateUserProfile implements CanActivate {
  constructor (
    private userApiService: UserApiService) {}

  private protectedRoutes = ['home'];

  public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = TokenStore.getAccessToken();

      if (!token) {
        return resolve(true);
      }

      return this.userApiService.promiseGetUser()
        .then((user: UserModel) => {
          TokenStore.setAccessToken(user.token);
          UserClass.setUser(user);
          return resolve(true);
        })
        .catch(error => {
          TokenStore.expungeData();
          window.location.reload();
        });
    });
  }
}
