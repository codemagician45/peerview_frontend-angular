import {
    Injectable
} from '@angular/core';
import {
    Resolve,
    Router
} from '@angular/router';
import {
    CryptoUtilities
} from '../shared/utilities';
import {
    CampusApiService
} from '../../services/api/campus.api.service';

@Injectable()
export class RedirectToMainCampus implements Resolve<boolean> {
    constructor (
        private router: Router,
        private campusApiService: CampusApiService
    ) { }

    public resolve (): Promise<boolean> {
        return new Promise((resolve) => {
            this.campusApiService.getCampusUser()
            .then((responseData: any) => {
                console.log(responseData);
                if (responseData.data && responseData.data.campus && responseData.data.campus.status === true) {
                    const campusId = CryptoUtilities.cipher(responseData.data.campus.id);
                    this.router.navigate([`/campus/${campusId}/all-students`]);
                }

                resolve(true);
            })
            .catch(err => {
                resolve(false);
            });

        });
    }
}
