/* tslint:disable:no-bitwise */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../../../../services';
import {
  UserApiService,
  InterestApiService
} from '../../../../../services/api';
import {
  SubInterestModel,
  InterestCategoryModel,
  UserModel,
  IResponse
} from '../../../../shared/models';
import 'rxjs/add/operator/mergeMap';

import {
  OnBoardingEmitter
} from '../../../../shared/emitter';

@Component({
  selector: 'user-on-boarding-student-interest-component',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class UserOnboardingStudentInterestComponent {
  constructor (
    private interestApiService: InterestApiService,
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  protected interests: any[] = [];
  protected subinterests: any[] = [];
  protected term = '';
  protected searchResult: any = [];
  protected maxSelectedInterestsCount = 5;
  protected selectedInterests: any[] = [];
  protected maxSelectedSubInterestsCount = 4;
  protected suggestedInterest: any[] = [];
  protected isDisabled: any[] = [];

  protected interestCategory: InterestCategoryModel[] = [];
  protected interestCategoryName: string;
  protected user: UserModel = new UserModel();

  public ngOnInit (): void {
    this.onBoardingEmitter();
    this.getInterests();
  }

  private getInterests (): void {
    this.interestApiService.promiseGetAllCategoryInterest()
      .then((interestCategory: InterestCategoryModel[]) => {
        this.interestCategory = interestCategory;
      })
      .catch(error => {

      });
  }

  public getSubInterests (interestCategory): void {
    this.interestApiService.promiseGetAllSubInterest(interestCategory.id)
      .then((subInterest: SubInterestModel[]) => {
        interestCategory['subInterests'] = subInterest;
      })
      .catch(error => {

      });
  }

  protected onSaveAdditionalSubInterest (category, subInterestData: HTMLInputElement): void {
    let subInterest = new SubInterestModel();
    subInterest.assimilate({
      name: subInterestData.value
    });

    this.interestApiService.promiseCreateSubInterest(category.id, subInterest)
      .then((interest: SubInterestModel) => {

      })
      .catch(error => {

      });
  }

  public onBoardingEmitter (): void {
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  protected onClickInterestCategory (isChecked: boolean, interestCategory): void {
    console.log(interestCategory);
    if (isChecked) {
      interestCategory.isCheck = true;
      this.getSubInterests(interestCategory);
    } else {
      interestCategory.isCheck = false;
    }

    // check how many isCheck we have
    let categoryCount = this.interestCategory.filter((category: any) => category.isCheck === true);
    if (categoryCount.length === 5) {
      this.interestCategory.map((category: any) => {
        !category.isCheck && (category.isDisabled = true);
      });
    } else {
      this.interestCategory.map((category: any) => {
        !category.isCheck && (category.isDisabled = false);
      });
    }
  }

  protected onSelectSubInterest (subInterest): void {
    if (!subInterest.isSelected) {
      this.user.subInterestIds.push(subInterest.id);
    } else {
      this.user.subInterestIds = this.user.subInterestIds.filter(id => id !== subInterest.id);
    }

    subInterest.isSelected = !subInterest.isSelected;
  }

  protected onSubmitSubInterests (): any {
    MessageNotificationService.show({
      notification: {
        id: 'user-onboarding-interest-finish-pleasewait',
        message: 'Saving...',
        instruction: 'Please wait...'
      }
    },
    NotificationTypes.Info);

    this.userApiService.promiseCreateUserSubInterest(this.user)
      .then(() => {
        return MessageNotificationService.show({
          notification: {
            id: 'user-onboarding-interest-finish-success',
            message: 'Saved... Success!!!',
            instruction: 'Redirecting...'
          }
        },
        NotificationTypes.Success);
      })
      .then(notificationState => {
        if (notificationState) {
          notificationState.subscribe((data: any) => {
            this.router.navigate(['/home']);
          });
        }
      })
      .catch(error => {
        MessageNotificationService.show({
          notification: {
            id: 'user-onboarding-interest-finish-error',
            message: 'Unable to Save.',
            reason: 'Some unexpected happened with the application.',
            instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
          }
        },
          NotificationTypes.Error);
      });
  }
}
