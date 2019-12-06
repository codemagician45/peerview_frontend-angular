import {
    Injectable
} from '@angular/core';
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
} from '@angular/router';
import {
    TokenStore
} from '../../../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private router: Router
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            const token = TokenStore.getAccessToken();

            if (token) {
                return resolve(true);
            } else {
                this.router.navigate(['/sign-in']);
                return resolve(false);
            }
        });
    }
}
