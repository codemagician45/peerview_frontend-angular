import {
    CourseModel, UserModel
} from '../app/shared/models';
import {
    HttpClient,
    HttpBackend
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Cloudinary
} from '@cloudinary/angular-5.x';
import {
    UserService,
} from '../services';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class CloudinaryUploadService {
    constructor (
        private http: HttpClient,
        private handler: HttpBackend,
        private cloudinary: Cloudinary,
        private loadingBar: NgxSpinnerService
    ) {
        this.http = new HttpClient(handler);
    }

    private user: UserModel = UserService.getUser();

    public uploadFileToCloudinary (file): Promise<any> {
        // *********** Upload file to Cloudinary ******************** //
        return new Promise((resolve, reject) => {
            let url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`;

            let fd = new FormData();

            fd.append('upload_preset', 'peersview');
            fd.append('folder', this.user.token); // Optional - add tag for image admin in Cloudinary
            fd.append('file', file);

            this.loadingBar.show();

            this.http.post(url, fd, { headers : {
                'X-Requested-With': 'XMLHttpRequest'
            }})
              .subscribe((response: any) => {
                this.loadingBar.hide();
                resolve(response);
              }, (error) => {
                this.loadingBar.hide();
                reject(error);
              });
        });
    }
}
