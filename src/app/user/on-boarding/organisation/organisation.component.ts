import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router
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
import {
 UserService, MessageNotificationService, NotificationTypes
} from '../../../../services';

@Component({
  selector: './organisation-component',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class UserOnboardingOrganisationComponent {
  constructor (
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  private currentUser: UserModel = UserService.getUser();

  public ngOnInit (): void {
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  protected onSubmit (): void {
    this.userApiService.promiseGetType('organizationInstitution')
      .then((userType: UserTypeModel) => {
        this.user.userTypeId = userType.id;
        this.currentUser.userTypeId = userType.id;
        this.currentUser.assimilate(this.user);
        return this.userApiService.promiseUpdateOnboardingDetails(this.user);
      })
      .then(() => {
        return MessageNotificationService.show({
          notification: {
            id: 'user-onboarding-organization-finish-success',
            message: 'Saved... Success!!!',
            instruction: 'Redirecting...'
          }
        },
        NotificationTypes.Success);
      })
      .then(notificationState => {
        if (notificationState) {
          notificationState.subscribe((data: any) => {
            window.location.href = '/home';
          });
        }
      })
      .catch(error => {
        if (error.status === 400) {
          MessageNotificationService.show({
            notification: {
              id: 'user-onboarding-organization-finish-pleasewait',
              // message: 'Unable to Save Interest.',
              message: 'Invalid Data',
              // reason: error.error.status_message,
              instruction: 'please try again.'
            }
          },
          NotificationTypes.Info);
        } else {
          MessageNotificationService.show({
            notification: {
              id: 'user-onboarding-interest-finish-error',
              message: 'Unable to Save.',
              reason: 'Some unexpected happened with the application.',
              instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
            }
          },
          NotificationTypes.Error);
        }
      });
  }
}
