import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CourseService,
  AuthenticationService
} from '../../../services/services';
import {
  Student
} from '../../../models/models';
import * as qs from 'query-string';

declare var swal: any;
@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss'],
})
export class TwoComponent implements OnInit {
  constructor (private router: Router,
    private courseService: CourseService,
    private authenticationService: AuthenticationService
  ) {
    this.model = new Student();
    this.model['gender'] = 'gender';
    this.model['courseIds'] = [0];
    this.model['userStudyLevelId'] = 0;
    const parsed = qs.parse(location.search);
    if (parsed.type === 'true') {
      swal('Success', 'You have verified your email!', 'success');
    }
  }

  @Output() private setStep: EventEmitter<string> = new EventEmitter();
  private courses: any[] = [];
  private studyLevel: any[] = [];
  private model: Student;

  public ngOnInit (): void {
    this.courseService.getCourses().subscribe((resp) => {
      if (resp['status'] === 'SUCCESS') {
        this.courses = resp['courses'];
      }
    });

    this.courseService.getLevelOfStudy().subscribe((response: any) => {
      this.studyLevel = response.userStudyLevel;
    });
  }

  protected onSubmit (): void {
    const model = this.model;
    model.courseIds = [parseInt(this.model.courseIds.toString(), 10)];
    this.authenticationService.updateStudent(model).subscribe((response: any) => {
      console.log(response);
    }, (error) => {
      this.setStep.emit('3');
    });
  }
}
