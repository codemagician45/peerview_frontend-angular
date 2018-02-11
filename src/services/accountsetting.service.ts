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
  UserOnboardingDetails
} from '../models/models';

@Injectable()
export class AccountSettingService {
  constructor (private http: HttpClient) {}

  public getAccountSetting (): Observable<Object> {
    return this.http.get('accountSettings');
  }

  public updatepassword (item: any): Observable<Object> {
    return this.http.put(`user/password`, item);
  }

  public updateAboutMe (aboutMe: any): Observable<Object> {
    aboutMe = {aboutMe: aboutMe};
    return this.http.put(`user/about-me`, aboutMe);
  }

  public updateUserAccomplishments (accomplishments: any): Observable<Object> {
    accomplishments = {accomplishments};
    return this.http.put(`user/accomplishments`, accomplishments);
  }

  public getUserInterests (): Observable<Object> {
    return this.http.get(`user/interests`);
  }

  public removeUserInterest (userInterestId): Observable<Object> {
    return this.http.delete(`user/interest/${userInterestId}`);
  }

  public getuserprofile (): Observable<Object> {
    return this.http.get('user/profile');
  }

  public getusercredits (): Observable<Object> {
    return this.http.get('user/credits' );
  }

  public getUsertimeline (): Observable<Object> {
    return this.http.get(`user/timeline`);
  }

  public getpeopleyoumayknow (): Observable<Object> {
    return this.http.get('peers-list');
  }

  public updateSecurityaPrivacy (model: {profilePrivacy: boolean, protectPost: boolean, userPrivacyId: number}): Observable<Object> {
    return this.http.put(`user/security`, model);
  }

  public unblockuser (unblockuserid: number, body: any): Observable<Object> {
    return this.http.delete(`users/${unblockuserid}/unblock`, body);
  }

  public unfollowuser (unfollowuserid: number): Observable<Object> {
    return this.http.delete(`user/${unfollowuserid}/follow`);
  }

  public followuser (followuserid: number): Observable<Object> {
    return this.http.post(`user/${followuserid}/follow`, {});
  }

  public getUserInfo (userid: number): Observable<Object> {
    return this.http.get(`user/${userid}/info`, {});
  }

  public getUserProfile (): Observable<Object> {
    return this.http.get(`user/profile`);
  }

  public updateuser (user: any): Observable<Object> {
    return this.http.put(`users/${user.id}`, user);
  }

  public updateaboutus (about: any): Observable<Object> {
    return this.http.post('', about);
  }

  public invitebyemail (emailBody: any): Observable<Object> {
    return this.http.post('user/invite-users', emailBody);
  }

  public passwordreset (jotToken, item): Observable<Object> {
    return this.http.put(`user/password-reset/${jotToken}`, item);
  }

  public updateuserInterests (interestIds: number[]): Observable<Object> {
    return this.http.post(`user/interests`, interestIds);
  }

  public updateonboardingdetails (onboard: UserOnboardingDetails): Observable<Object> {
    return this.http.post(`user/onboarding/details`, onboard);
  }

  public searchuser (searchkeyword: string): Observable<Object> {
    return this.http.get(`advance-search/user?keyword='${searchkeyword}'`);
  }

  public generalsearch (searchkeyword: string): Observable<Object> {
    return this.http.get(`search?searchString='${searchkeyword}'`);
  }

  public searchInterests (searchkeyword: string): Observable<Object> {
    return this.http.get(`search/interests?keyword=${searchkeyword}`);
  }
}
