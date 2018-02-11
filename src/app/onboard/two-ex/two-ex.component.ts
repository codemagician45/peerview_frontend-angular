import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ExStudent
} from '../../../models/models';
import {
  AuthenticationService,
  CourseService
} from '../../../services/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-two-ex',
  templateUrl: './two-ex.component.html',
  styleUrls: ['./two-ex.component.scss']
})
export class TwoExComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private courseService: CourseService,
    private router: Router) {}

  @Output() private setStep: EventEmitter<string> = new EventEmitter();
  private model = new ExStudent();
  private courses = [];

  public ngOnInit (): void {
    this.courseService.getCourses().subscribe((resp) => {
      this.courses = _.orderBy(resp['courses'], ['course'], ['asc']);
    });
  }

  protected addExpertise (): void {
    this.model.expertiseArray.push(this.model.expertise);
    this.model.expertise = '';
  }

  protected removeExpertise (item: string): void {
    console.log(item);
    const index = this.model.expertiseArray.indexOf(item);
    if (index > -1) {
      this.model.expertiseArray.splice(index, 1);
    }
  }

  protected onSubmit (): void {
    this.model.expertise = JSON.stringify(this.model.expertiseArray);
    console.log(JSON.stringify(this.model));
    this.authenticationService.updateExStudent(this.model).subscribe((response: any) => {
      console.log(response);
    }, (error) => {
      console.log(error);
      this.setStep.emit('3');
    });
  }
}
