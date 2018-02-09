import {
  Injectable
} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  UserService
} from '../services/services';
import {
  CONFIG
} from '../config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private userService: UserService) {}

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone({
      setHeaders: {
        'content-type': 'application/json',
        'token': this.userService.isAuthenticated() ? this.userService.getLoggedInUser().token : ''
      },
      url: `${CONFIG[CONFIG.environment].api}${req.url}`
    });

    return next.handle(authReq);
  }
}
