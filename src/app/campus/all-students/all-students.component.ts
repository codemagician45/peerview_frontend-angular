import {
  Component,
  Input
} from '@angular/core';
import {
  PostModel,
} from '../../shared/models';

@Component({
  selector: 'campus-all-students-component',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class CampusAllStudentsComponent {
  constructor () {}

  protected posts: Array<PostModel> = [];
}
