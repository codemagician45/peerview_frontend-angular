import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusStudentGroupModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
   selector: 'campus-student-group-create-group-component',
  templateUrl: './student-group-create-group.component.html',
  styleUrls: ['./student-group-create-group.component.scss']
})
export class CampusStudentGroupCreateGroupComponent implements OnInit {
  constructor (
    private campusApiService: CampusApiService,
    private route: ActivatedRoute
  ) {}

  protected campusStudentGroup: CampusStudentGroupModel = new CampusStudentGroupModel();
  protected campusId: number;

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });
  }

  protected onCreateGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseCreateStudentGroup(campusId, this.campusStudentGroup)
      .then(() => {
        console.log('success');
      })
      .catch(() => {});
  }
}
