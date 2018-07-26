import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  PostModel,
} from '../../../shared/models';

@Component({
  selector: 'campus-all-students-component',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class CampusAllStudentsComponent {
  constructor (private route: ActivatedRoute) {}

  protected posts: Array<PostModel> = [];
  protected idParams: string;

  public ngOnInit (): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.idParams = params.id;
    });
  }
}
