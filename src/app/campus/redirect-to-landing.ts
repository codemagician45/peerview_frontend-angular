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
export class RedirectToLandingCampus implements Resolve<boolean> {
    constructor (
        private router: Router,
        private campusApiService: CampusApiService
    ) { }

    public resolve (): Promise<boolean> {
        return new Promise((resolve) => {
            this.campusApiService.getCampusUser()
            .then((responseData: any) => {
                console.log(responseData);
                if (!responseData.data || !responseData.data.campus || responseData.data.campus.status === false) {
                    this.router.navigate([`/campus`]);
                }

                resolve(true);
            })
            .catch(err => {
                resolve(false);
            });

        });
    }
}
