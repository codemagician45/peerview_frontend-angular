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
  TokenStore
} from '../services';
import {
  CONFIG
} from '../config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor () {}

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.clone({
      setHeaders: {
        'content-type': 'application/json',
        'token': TokenStore.getAccessToken() ? TokenStore.getAccessToken() : ''
      },
      url: `${CONFIG[CONFIG.environment].api}${req.url}`
    });

    return next.handle(headers);
  }
}
