import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  SignUp,
  SignIn,
  User,
  Student,
  ExStudent,
  ForgotPassword,
  SignInSocial,
  ResetPassword
} from '../models/models';
import * as qs from 'query-string';

@Injectable()
export class AuthenticationService {
  constructor (private http: HttpClient) {}

  public authenticateCustomerWithSocial (signInSocial: SignInSocial): Observable<Object> {
    return this.http.post('user/social-login', signInSocial);
  }

  /* Forgot Password User Service */
  public restorePassword (email: ForgotPassword): Observable<Object> {
    return this.http.post('user/forgot-password', email);
  }

  public authenticateCustomer (signIn: SignIn): Observable<Object> {
    return this.http.post('user/login', signIn);
  }

  /* authenticate User email Service */
  public authenticateUseremail (jotToken): Observable<Object> {
    const parsed = qs.parse(location.search);
    return this.http.post(`user/verify-email/${jotToken}`, { token: parsed.token });
  }

  /* authenticate User token forgot Password service */
  public authenticatetoken (): Observable<Object> {
    const parsed = qs.parse(location.search); // see comment above
    return this.http.post(`token/verify`, {
      headers: { 'Content-Type': 'application/json', 'token': parsed.secret }
    });
  }

  /* reset password User service */
  public resetPassword (reset: ResetPassword, token): Observable<Object> {
    const parsed = qs.parse(location.search); // refer to comment above
    let data = {
      'password': reset.password,
      'confirmPassword': reset.confirmPassword,
      'secret': parsed.secret
    };

    return this.http.put(`user/password-reset/${token}`, data);
  }

  public updateStudent (student: Student): Observable<Object> {
    return this.http.post('user/onboarding/details', student);
  }

  public updateExStudent (exStudent: ExStudent): Observable<Object> {
    return this.http.post('users/details/add', exStudent);
  }

  public updateInterests (interests: Array<object>[]): Observable<Object> {
    return this.http.post('user/interests', { 'interestIds': interests });
  }

  public getfollowingusers (userid: number): Observable<Object> {
    return this.http.get(`user/following/${userid}`);
  }

  public getfollowers (userid: number): Observable<Object> {
    return this.http.get(`user/followers/${userid}`);
  }

  public signupforbeta (signup: any): Observable<Object> {
    return this.http.post('landing/emails', signup);
  }

  public istokenvalid (): Observable<Object> {
    return this.http.post('token/verify', {});
  }

  public sociallogin (login: SignInSocial): Observable<Object> {
    return this.http.post(`user/social-login`, login);
  }
}
