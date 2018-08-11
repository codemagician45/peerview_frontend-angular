import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  CampusClassPostModel
} from '../../../../shared/models';
import {
  CampusApiService
} from '../../../../../services/api/campus.api.service';
import {
  CryptoUtilities
} from '../../../../shared/utilities';

@Component({
  selector: 'campus-classes-main-component',
  templateUrl: './classes-main.component.html',
  styleUrls: ['./classes-main.component.scss']
})
export class CampusClassesMainComponent {
  constructor (
    private route: ActivatedRoute,
    private campusApiService: CampusApiService
  ) {}

  protected campusId: number;
  protected campusClassId: number;
  protected campusClass: CampusClassPostModel[] = [];

  public ngOnInit (): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.campusId = params.id;
    });

    this.route.params.subscribe((params: Params) => {
      this.campusClassId = params.id;
    });
  }

  public ngAfterViewInit (): void {
    this.getCampusClassesPosts();
  }

  private getCampusClassesPosts (): void {
    let campusId = parseInt(CryptoUtilities.decipher(this.campusId), 10);
    let campusClassId = parseInt(CryptoUtilities.decipher(this.campusClassId), 10);
    this.campusApiService.promiseGetAllClassPost(campusId, campusClassId)
      .then((campusClass: CampusClassPostModel[]) => {
        this.campusClass = campusClass;
      })
      .catch(() => {});
  }
}
