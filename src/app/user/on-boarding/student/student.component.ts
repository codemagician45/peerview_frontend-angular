import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  UserModel,
  UserTypeModel,
  UserStudyLevelModel,
  CourseModel
} from '../../../shared/models';
import {
  UserApiService,
  CourseApiService
} from '../../../../services/api';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'user-on-boarding-student-component',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class UserOnboardingStudentComponent implements OnInit {
  constructor (
    private userApiService: UserApiService,
    private courseApiService: CourseApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  protected userStudyLevels: UserStudyLevelModel[] = [];
  protected courses: UserStudyLevelModel[] = [];

  public ngOnInit (): void {
    this.getUserStudyLevels();
    this.getCourses();
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  private getUserStudyLevels (): void {
    this.userApiService.promiseGetStudyLevels()
      .then((userStudyLevels: UserStudyLevelModel[]) => {
        this.userStudyLevels = userStudyLevels;
      })
      .catch(() => {

      });
  }

  private getCourses (): void {
    this.courseApiService.promiseGetAllCourses()
      .then((courses: CourseModel[]) => {
        this.courses = courses;
      })
      .catch(error => {

      });
  }

  protected onSubmit (isValid): void {
    this.userApiService.promiseGetType('student')
      .then((userType: UserTypeModel) => {
        this.user.userTypeId = userType.id;
        return this.userApiService.promiseUpdateOnboardingDetails(this.user);
      })
      .then(() => {
        this.router.navigate(['/user/on-boarding/status/student/interest']);
      })
      .catch(error => {

      });
  }

  protected onChangeCourse (value: number): void {
    this.user.courseIds.push(value);
  }

  protected onChangeStudyLevel (value: number): void {
    this.user.userStudyLevelId = value;
  }

  protected onChangeGender (value: string): void {
    this.user.gender = value;
  }
}
