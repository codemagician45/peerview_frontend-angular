import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {
  CampusApiService
} from '../../../../../services/api';
import {
  CampusClassModel
} from '../../../../shared/models';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-classes-landing-component',
  templateUrl: './classes-landing.component.html',
  styleUrls: ['./classes-landing.component.scss']
})
export class CampusClassesLandingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected campusClassList: Array<any> = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;

      this.getCourseList();
    });
  }

  private getCourseList (): void {
    this.campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    this.campusApiService.promiseGetAllClassList(this.campusId)
      .then((campusClassList: CampusClassModel[]) => {
        this.campusClassList = campusClassList;
      });
  }

  protected onClickNavigate (classId): void {
    const encrypteClassId = CryptoUtilities.cipher(classId);
    this.router.navigate([`../${encrypteClassId}`], {relativeTo: this.route});
  }
}
