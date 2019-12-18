import {
    Injectable
} from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import {
    UserService
} from '../../services';

@Injectable()
export class CanActivateJobCompose implements CanActivate {
    constructor (
        private router: Router
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            const user = UserService.getUser();
            if (user && user.userTypeId === 3) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    }
}
