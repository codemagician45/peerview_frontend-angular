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
  UserService,
  CheckProfileCompletionService
} from '../../../services';
import {
  UserModel, ProfileCompleteModel
} from '../models';

@Injectable()
export class CanActivateUserProfile implements CanActivate {
  constructor (
    private userApiService: UserApiService,
    private checkProfileIncompletion: CheckProfileCompletionService
  ) {}

  public canActivate (/*route: ActivatedRouteSnapshot, state: RouterStateSnapshot*/): Promise<boolean> {
    return new Promise((resolve) => {
      const token = TokenStore.getAccessToken();

      if ((token && UserService.getUser()) || !token) {
        return resolve(true);
      }

      this.userApiService.promiseGetUser()
        .then((userData: any) => {
          TokenStore.setAccessToken(userData.token);
          UserService.setUser(userData);

          // if (
          //   !userData.aboutMe ||
          //   !userData.userSkills ||
          //   userData.userSkills.length === 0 ||
          //   !userData.workExperiences ||
          //   userData.workExperiences.length === 0
          // ) {
          //   let model = new ProfileCompleteModel;
          //   model.status = true;
          //   model.aboutme = !userData.aboutMe;
          //   model.workExperience = !userData.workExperiences || userData.workExperiences.length === 0;
          //   model.skills = !userData.userSkills || userData.userSkills.length === 0;
          //   this.checkProfileIncompletion.setStatus(model);
          // }

          resolve(true);
        })
        .catch(() => {
          TokenStore.expungeData();
          window.location.reload();
          resolve(false);
        });
    });
  }
}
