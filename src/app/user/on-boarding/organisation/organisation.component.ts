import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel,
  UserTypeModel
} from '../../../shared/models';
import {
  UserApiService
} from '../../../../services/api';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';

@Component({
  selector: './organisation-component',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class UserOnboardingOrganisationComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  protected user: UserModel = new UserModel();

  public ngOnInit (): void {
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  protected onSubmit (isValid): void {
    this.userApiService.promiseGetType('organizationInstitution')
      .then((userType: UserTypeModel) => {
        this.user.userTypeId = userType.id;

        return this.userApiService.promiseUpdateOnboardingDetails(this.user);
      })
      .catch(error => {

      });
  }
}
