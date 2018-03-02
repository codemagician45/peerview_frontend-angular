import {
  Injectable,
  Inject
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
  User
} from '../models/models';
import {
  UserModel,
  SignInViaSocialModel
} from '../app/shared/models';

@Injectable()
export class UserService {
  constructor (
    private http: HttpClient,
    @Inject(Window) private window: Window
  ) {}

  public loggedInUser: User = this.getLoggedInUser();

  public isAuthenticated (): boolean {
    const user = this.window.localStorage.getItem('user');
    if (this.loggedInUser && user) { return true; }

    return false;
  }

  public getLoggedInUser (): User {
    const user = this.window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return this.loggedInUser;
    }
  }

  public setLoggedInUser (userModel: UserModel): Observable<any> {
    let user = new UserModel();
    user.firstName = userModel.firstName;
    user.lastName = userModel.firstName;
    user.email = userModel.email;
    user.token = userModel.token;

    // this.loggedInUser.id = user.id;
    localStorage.setItem('user', JSON.stringify(user));

    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public logoutuser (): void {
    this.window.localStorage.removeItem('user');
    this.window.localStorage.clear();
    this.loggedInUser = null;
  }

  public verifyEmail (jotToken: string, token: string): Observable<Object> {
    return this.http.post(`user/verify-email/${jotToken}`, {token: token});
  }

  public getProfile (): Observable<Object> {
    return this.http.get('user/profile');
  }

  public getUserStudyLevels (): Observable<Object> {
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
}
