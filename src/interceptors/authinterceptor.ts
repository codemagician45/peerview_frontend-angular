import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UserService} from "../services/services";
import {environment} from "../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req.clone({
    setHeaders: {"content-type": "application/json","token": this.userService.isAuthenticated()? this.userService.getLoggedInUser().token:""},
    url: `${environment.api}${req.url}`
  });
       return next.handle(authReq);
 }

}
