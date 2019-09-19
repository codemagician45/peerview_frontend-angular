import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  CampusApiService
} from '../../../services/api/campus.api.service';
import {
  CloudinaryUploadService
} from '../../../services';
import {
  CampusFactory
} from '../../shared/models/campus.factory';
import {
  CampusModel
} from '../../shared/models';
import {
  IResponse
} from '../../shared/models';
import {
  CryptoUtilities
} from '../../shared/utilities';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'campus-landing-page-component',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class CampusLandingPageComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private campusApiService: CampusApiService,
    private cloudinaryUploadService: CloudinaryUploadService
  ) {}

  protected logoFile: any;
  protected campuses: Array<CampusModel> = [];
  private campus: CampusModel = new CampusModel();
  private newCampus: CampusModel = new CampusModel();

  @ViewChild('picker') private datePicker: MatDatepicker<any>; //
  @ViewChild('closeCreateCampusModal') private closeCreateCampusModal: ElementRef;
  @ViewChild('openEmailVerifyCampusModal') private openEmailVerifyCampusModal: ElementRef;
  @ViewChild('openJoinCampusModal') private openJoinCampusModal: ElementRef;
  @ViewChild('closeJoinCampusModal') private closeJoinCampusModal: ElementRef;

  public ngOnInit (): void {
    this.campusApiService.getCampuses()
      .then((responseData: CampusModel[]) => {
        this.campuses = responseData;
      });
  }

  protected onSelectedCampus (value: string): void {
    const index = this.campuses.findIndex((campus: CampusModel) => campus.id === parseInt(value, 10));
    this.campus = this.campuses[index];
  }

  protected onJoinWithInstitution (): void {
    this.openJoinCampusModal.nativeElement.click();
  }

  protected joinCampus (): void {
    // const campusId = CryptoUtilities.cipher(this.campus.id);
    // this.router.navigate([`${campusId}/all-students`], {relativeTo: this.route});
    this.campusApiService.promiseJoinCampus(this.campus)
      .then((res: any) => {
        this.closeJoinCampusModal.nativeElement.click();
        this.openEmailVerifyCampusModal.nativeElement.click();
      })
      .catch(() => {});
  }

  protected close ($event): void {
    this.datePicker.close();
  }

  protected onFileChange (event): void {
    this.logoFile = event.target.files[0];
  }

  protected uploadLogo (): void {
    this.cloudinaryUploadService.uploadFileToCloudinary(this.logoFile)
      .then((res: any) => {
        this.newCampus.logo = res.public_id;
        this.campusApiService.promiseCreateCampus(this.newCampus)
          .then((res1: any) => {
            this.closeCreateCampusModal.nativeElement.click();
            this.openEmailVerifyCampusModal.nativeElement.click();
          })
          .catch(() => {});
      })
      .catch(() => {});
  }
}
