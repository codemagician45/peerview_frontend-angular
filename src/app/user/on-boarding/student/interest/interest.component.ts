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
  CourseService,
  InterestService,
  UserService,
  MessageNotificationService,
  NotificationTypes
} from '../../../../../services';
import {
  IInterestCategoryResponse,
  ISubInterestsResponse,
  SubInterestModel,
  InterestCategoryModel,
  Response
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
    private courseService: CourseService,
    private interestService: InterestService,
    private userService: UserService,
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

  protected interestCategory: Array<InterestCategoryModel> = [];
  protected subInterests: Array<SubInterestModel> = [];
  protected interestCategoryName: string;
  protected subInterestIds: Array<number> = [];

  public ngOnInit (): void {
    this.onBoardingEmitter();
    this.getInterests();
  }

  private getInterests (): void {
    this.interestService.getInterests()
    .subscribe((response: IInterestCategoryResponse) => {

      this.interestCategory = response.interestCategory;
    });
  }

  public getSubInterests (interestCategory): void {
    this.courseService.getSubInterest(interestCategory.id)
    .subscribe((response: ISubInterestsResponse) => {
      interestCategory['subInterests'] = response.interests;
    });
  }

  protected onSaveAdditionalSubInterest (category, subInterest: HTMLInputElement): void {
    // save there the additional sub-interest
    this.interestService.saveSubInterest(category.id, subInterest.value)
    .subscribe((response: any) => {
      console.log(response);
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
      // save the subInterest here for that authenticated user
      this.subInterestIds.push(subInterest.id);
      // this.userService.saveSubInterests(this.subInterestIds)
    } else {
      this.subInterestIds = this.subInterestIds.filter(id => id !== subInterest.id);
    }

    console.log(this.subInterestIds);
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

    this.userService.saveSubInterests(this.subInterestIds)
    .mergeMap((response: Response) => {
      return MessageNotificationService.show({
        notification: {
          id: 'user-onboarding-interest-finish-success',
          message: 'Saved... Success!!!',
          instruction: 'Redirecting...'
        }
      },
      NotificationTypes.Success);
    })
    .toPromise()
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
