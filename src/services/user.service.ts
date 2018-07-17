import {
  Injectable,
  Inject
} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  SignUp,
  SignIn,
  User
} from '../models/models';
import {
  UserModel,
  SignInViaSocialModel,
  SignUpViaSocialModel
} from '../app/shared/models';
import {
  AuthService
} from 'angularx-social-login';

@Injectable()
export class UserService {
  constructor (
    private http: HttpClient,
    private authService: AuthService,
    @Inject(Window) private window: Window
  ) {}

  public isAuthenticated (): boolean {
    const user = this.window.localStorage.getItem('user');
    if (user) { return true; }

    return false;
  }

  public getLoggedInUser (): User {
    const user = this.window.localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public setLoggedInUser (userModel: UserModel): Observable<any> {
    let user = new UserModel();
    user.firstName = userModel.firstName;
    user.lastName = userModel.firstName;
    user.email = userModel.email;
    user.token = userModel.token;

    // this.loggedInUser.id = user.id;
    window.localStorage.setItem('user', JSON.stringify(user));

    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public signOut (): void {
    this.clearLocalStorage();
    this.authService.signOut();
  }

  public clearLocalStorage (): void {
    this.window.localStorage.removeItem('user');
    this.window.localStorage.clear();
  }

  public verifyEmail (jotToken: string, token: string): Observable<Object> {
    return this.http.post(`user/verify-email/${jotToken}`, {token: token});
  }

  public getProfile (userId?: string): Observable<Object> {
    const options = userId ? {
      params: new HttpParams().set('userId', userId.toString())
    } : {};

    return this.http.get('user/profile', options);
  }

  public getStudyLevels (): Observable<Object> {
    return this.http.get('user/study-levels');
  }

  public getPeerslist (): Observable<Object> {
    return this.http.get('user/peers-list');
  }

  public getFollowee (): Observable<Object> {
    return this.http.get('user/followee');
  }

  public getFollowers (): Observable<Object> {
    return this.http.get('user/followers');
  }

  public getTimeline (): Observable<Object> {
    return this.http.get(`user/timeline`);
  }

  public signUp (user: UserModel): Observable<Object> {
    return this.http.post('user/register', user);
  }

  public signIn (user: UserModel): Observable<Object> {
    return this.http.post('user/login', user);
  }

  public signInViaSocial (signInSocial: SignInViaSocialModel): Observable<Object> {
    return this.http.post('user/social-login', signInSocial);
  }

  public signUpViaSocial (signUpSocial: SignUpViaSocialModel): Observable<Object> {
    return this.http.post('user/social-login', signUpSocial);
  }

  public update (user: UserModel): Observable<Object> {
    return this.http.post('user/onboarding/details', user);
  }

  public updateName (name: {firstName: string, lastName: string}): Observable<Object> {
    return this.http.put('user/name', name);
  }

  public updateEmail (email): Observable<Object> {
    return this.http.put('user/email', {email});
  }

  public updateLanguage (language): Observable<Object> {
    return this.http.put('user/language', {language});
  }

  public updatepassword (user: UserModel): Observable<Object> {
    return this.http.put(`user/password`, user);
  }

  public updateSecurity (user: UserModel): Observable<Object> {
    return this.http.put('user/security', user);
  }

  public updateAboutMe (aboutMe: any): Observable<Object> {
    aboutMe = {aboutMe: aboutMe};
    return this.http.put(`user/about-me`, aboutMe);
  }

  public saveSubInterests (interestIds: Array<number>): Observable<Object> {
    return this.http.post('user/interests', {interestIds});
  }

  public getTypeId (typeCode: string): Observable<Object> {
    return this.http.get(`user/type/${typeCode}`);
  }
}
