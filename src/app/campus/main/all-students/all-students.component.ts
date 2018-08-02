import {
  Component,
  Input
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusPostModel
} from '../../../shared/models';
import {
  CampusApiService
} from '../../../../services/api';
import {
  CryptoUtilities
} from '../../../shared/utilities';

@Component({
  selector: 'campus-all-students-component',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class CampusAllStudentsComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected posts: Array<CampusPostModel> = [];
  protected idParams: number;

  public ngOnInit (): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.idParams = params.id;
      this.getCampusPosts();
    });
  }

  private getCampusPosts (): void {
    this.idParams = parseInt(CryptoUtilities.decipher(this.idParams), 10);
    this.campusApiService.promiseGetAllPost(this.idParams)
      .then((campusPost: CampusPostModel[]) => {
        this.posts = campusPost;
      })
      .catch((error) => {});
  }
}
