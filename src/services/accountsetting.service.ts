import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserOnboardingDetails } from "../models/models";

@Injectable()
export class AccountSettingService {
  constructor(private http: HttpClient) {}

  getAccountSetting() {
    return this.http.get("accountSettings");
  }

  updatepassword(item: any) {
    return this.http.put(`user/password`, item);
  }

  updateAboutMe(aboutMe: any) {
    aboutMe = {aboutMe: aboutMe};
    return this.http.put(`user/about-me`, aboutMe);
  }

  getuserprofile() {
    return this.http.get('user/profile');
  }

  getusercredits() {
    return this.http.get('user/credits' );
  }

  getusertimeline(){
    return this.http.get(`user/timeline`);
  }

  getpeopleyoumayknow() {
    return this.http.get('peers-list');
  }

  updatesecurityandprivacy(userid:number, model: any) {
    return this.http.put(`users/${userid}/security`, model);
  }

  unblockuser(unblockuserid: number, body: any) {
    return this.http.delete(`users/${unblockuserid}/unblock`, body);
  }

  unfollowuser(unfollowuserid: number){
    return this.http.delete(`user/${unfollowuserid}/follow`);
  }

  followuser(followuserid: number){
    return this.http.post(`user/${followuserid}/follow`, {});
  }

  getUserInfo(userid: number){
    return this.http.get(`user/${userid}/info`, {});
  }

  updateuser(user: any) {
    return this.http.put(`users/${user.id}`, user);
  }

  updateaboutus(about: any) {
    return this.http.post("", about);
  }

  invitebyemail(email_body: any) {
    return this.http.post("user/invite-users", email_body);
  }

  passwordreset(jotToken, item) {
    return this.http.put(`user/password-reset/${jotToken}`,item)
  }

  updateuserInterests(interestIds: number[]) {
    return this.http.post(`user/interests`, interestIds);
  }

  updateonboardingdetails(onboard: UserOnboardingDetails){
    return this.http.post(`user/onboarding/details`, onboard);
  }

  searchuser(searchkeyword: string) {
    return this.http.get(`advance-search/user?keyword='${searchkeyword}'`);
  }

  generalsearch(searchkeyword: string) {
    return this.http.get(`search?searchString='${searchkeyword}'`);
  }

}
