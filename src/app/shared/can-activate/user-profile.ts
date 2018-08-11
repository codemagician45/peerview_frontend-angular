import {
  Injectable
} from '@angular/core';
import {
  CanActivate
} from '@angular/router';
import {
  UserApiService,
} from '../../../services/api';
import {
  TokenStore,
  UserService
} from '../../../services';
import {
  UserModel
} from '../models';

@Injectable()
export class CanActivateUserProfile implements CanActivate {
  constructor (
    private userApiService: UserApiService) {}

  public canActivate (/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = TokenStore.getAccessToken();

      if (!token) {
        return resolve(true);
      }

      return this.userApiService.promiseGetUser()
        .then((user: UserModel) => {
          TokenStore.setAccessToken(user.token);
          UserService.setUser(user);
          return resolve(true);
        })
        .catch((error) => {
          TokenStore.expungeData();
          window.location.reload();
          reject(error);
        });
    });
  }
}
