import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router
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
    private userApiService: UserApiService,
    private router: Router
  ) {}

  public canActivate (/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = TokenStore.getAccessToken();
      const user = UserService.getUser();

      if ((token && UserService.getUser()) || !token) {
        console.log('user');
        user && this.checkIfUserIsAlreadyFinishInOnBoarding(user);
        return resolve(true);
      }


      return this.userApiService.promiseGetUser()
        .then((userData: UserModel) => {
          TokenStore.setAccessToken(userData.token);
          UserService.setUser(userData);
          this.checkIfUserIsAlreadyFinishInOnBoarding(userData);
          return resolve(true);
        })
        .catch((error) => {
          TokenStore.expungeData();
          window.location.reload();
          reject(error);
        });
    });
  }

  private checkIfUserIsAlreadyFinishInOnBoarding (user: UserModel): any {
    if (!user.userTypeId) {
      return this.router.navigate(['/user/on-boarding/status']);
    }
  }
}
