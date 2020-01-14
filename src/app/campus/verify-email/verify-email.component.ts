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
import { timer } from 'rxjs';

@Component({
  selector: 'campus-verify-email-component',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class CampusVerifyEmailComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private campusApiService: CampusApiService,
    private cloudinaryUploadService: CloudinaryUploadService
  ) {}

  public ngOnInit (): void {
    this.route.queryParams.subscribe((queryParams: {jotToken: string, token: string}) => {
      this.campusApiService.promiseVerifyCampusEmail(queryParams)
        .then((campusUser: any) => {
          console.log(campusUser);
          timer(3000)
          .subscribe(() => {
            const campusId = CryptoUtilities.cipher(campusUser.data.id);
            this.router.navigate([`../${campusId}/all-students`], {relativeTo: this.route});
          });
        })
        .catch(error => {});
    });
  }

}
