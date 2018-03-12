import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel,
  UserTypeReponse
} from '../../../shared/models';
import {
  UserService,
} from '../../../../services';
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
    private userService: UserService,
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
    this.userService.getTypeId('organizationInstitution')
    .mergeMap((response: UserTypeReponse) => {
      this.user.userTypeId = response.userTypeId;
      return this.userService.update(this.user);
    })
    .subscribe((response: Response) => {
      this.router.navigate(['./interest'], {relativeTo: this.route});
    });
  }
}
