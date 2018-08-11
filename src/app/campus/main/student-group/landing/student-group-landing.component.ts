import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CampusStudentGroup
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-student-group-landing-component',
  templateUrl: './student-group-landing.component.html',
  styleUrls: ['./student-group-landing.component.scss']
})
export class CampusStudentGroupLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected myCampusStudentGroup: Array<CampusStudentGroup> = [];
  protected publicCampusStudentGroup: Array<CampusStudentGroup> = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getMyPrivateGroup();
      this.getPublicGroup();
    });
  }

  private getMyPrivateGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllStudentGroup(campusId, true)
      .then((campusStudentGroup: CampusStudentGroup[]) => {
        this.myCampusStudentGroup = campusStudentGroup;
      });
  }

  private getPublicGroup (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllStudentGroup(campusId)
      .then((campusStudentGroup: CampusStudentGroup[]) => {
        this.publicCampusStudentGroup = campusStudentGroup;
      });
  }
}
