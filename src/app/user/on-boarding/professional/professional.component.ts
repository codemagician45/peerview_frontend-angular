import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  OnBoardingEmitter
} from '../../../shared/emitter';
import {
  CourseService,
  UserService
} from '../../../../services';
import {
  CoursesResponse,
  CourseModel,
  UserModel,
  UserTypeReponse
} from '../../../shared/models';

@Component({
  selector: 'user-on-boarding-professional-component',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class UserOnboardingProfessionalComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  protected courses: Array<CourseModel>;
  protected courseAdded: Array<CourseModel> = [];
  protected user: UserModel = new UserModel();

  public ngOnInit (): void {
    this.getCourses();
    this.route.data
    .subscribe((data: any) => {
      OnBoardingEmitter
      .onBoardingCurrentRoute()
      .emit(data.step);
    });
  }

  private getCourses (): void {
    this.courseService.getCourses()
    .subscribe((response: CoursesResponse) => {
      console.log(response);
      this.courses = response.courses;
    });
  }

  protected onChangeCourse (value: string): void {
    // check if the value is not yet on the Array
    let count = this.courseAdded.filter(item => item.id === parseInt(value, 10));

    if (count.length === 0) {
      let course = this.courses.filter(item => item.id === parseInt(value, 10))[0];
      this.courseAdded.push(course);
    }

    this.user.courseIds = this.courseAdded.map(item => item.id);
  }

  protected removeCourseAdded (course): void {
    this.courseAdded = this.courseAdded.filter(item => item.id !== course.id);
    this.user.courseIds = this.courseAdded.map(item => item.id);
  }

  protected onSubmit (): void {
    this.userService.getTypeId('professionals')
    .mergeMap((response: UserTypeReponse) => {
      this.user.userTypeId = response.userTypeId;

      return this.userService.update(this.user);
    })
    .subscribe((response: Response) => {
      console.log(response);
    });
  }
}
