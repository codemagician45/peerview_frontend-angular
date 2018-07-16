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
  CourseModel,
  UserStudyLevelModel,
  UserStudyLevelsResponse,
  CoursesResponse,
  UserTypeReponse,
  Response
} from '../../../shared/models';
import {
  UserService,
  CourseService
} from '../../../../services';
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
    private userService: UserService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  protected user: UserModel = new UserModel();
  protected userStudyLevels: Array<UserStudyLevelModel>;
  protected courses: Array<CourseModel>;

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
    this.userService.getStudyLevels()
    .subscribe((response: UserStudyLevelsResponse) => {
      this.userStudyLevels = response.userStudyLevels;
    });
  }

  private getCourses (): void {
    this.courseService.getCourses()
    .subscribe((response: CoursesResponse) => {
      this.courses = response.courses;
    });
  }

  protected onSubmit (isValid): void {
    this.userService.getTypeId('student')
    .mergeMap((response: UserTypeReponse) => {
      this.user.userTypeId = response.userTypeId;
      return this.userService.update(this.user);
    })
    .subscribe((response: Response) => {
      this.router.navigate(['/user/on-boarding/status/student/interest']);
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
