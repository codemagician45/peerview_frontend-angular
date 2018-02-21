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
  User
} from '../models/models';
import {
  UserModel
} from '../app/shared/models';

@Injectable()
export class UserService {
  constructor (private http: HttpClient) {}

  public loggedInUser: User = this.getLoggedInUser();

  public isAuthenticated (): boolean {
    if (this.loggedInUser === null || this.loggedInUser === undefined) {
      const user = localStorage.getItem('user');
      if (user !== null && user !== undefined) {
        this.loggedInUser = JSON.parse(user);
      }
    }

    return (this.loggedInUser !== null && this.loggedInUser !== undefined);
  }

  public getLoggedInUser (): User {
    if (this.loggedInUser === null || this.loggedInUser === undefined) {
      const user = localStorage.getItem('user');
      if (user !== null && user !== undefined) {
        this.loggedInUser = JSON.parse(user);
      }
    }

    return this.loggedInUser;
  }

  public setLoggedInUser (user: any): void {
    this.loggedInUser = new User(user.first_name, user.last_name, user.email, user.is_active, user.token);
    this.loggedInUser.id = user.id;
    localStorage.setItem('user', JSON.stringify(this.loggedInUser));
  }

  public logoutuser (): void {
    localStorage.removeItem('user');
    localStorage.clear();
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
}
