import { Injectable } from "@angular/core";
import { SignUp, SignIn, User, Student, ExStudent, ForgotPassword, SignInSocial, ResetPassword } from "../models/models";
import { HttpClient } from "@angular/common/http";
import * as qs from 'query-string';


@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {

  }
  authenticateCustomerWithSocial(signInSocial: SignInSocial) {
    return this.http.post("user/social-login", signInSocial);
  }

  registerCustomer(signUp: SignUp) {
    return this.http.post("user/register", signUp);
  }

  /* Forgot Password User Service */ // Rename method more appropraitely if it doesn't reflect true intent of the function. Only use comments when extra information is provided.
  restorePassword(email: ForgotPassword) {
    return this.http.post("user/forgot-password", email);
  }

  authenticateCustomer(signIn: SignIn) {
    return this.http.post("user/login", signIn);
  }

  /* authenticate User email Service */
  authenticateUseremail(jotToken) {
    const parsed = qs.parse(location.search); // This service shouldn't be aware of the sourceof the data. Kindly extract and call this method with value
    return this.http.post(`user/verify-email/${jotToken}`, { token: parsed.token });
  }

  /* authenticate User token forgot Password service */
  authenticatetoken() {
    const parsed = qs.parse(location.search); // see comment above
    return this.http.post(`token/verify`, {
      headers: { 'Content-Type': 'application/json', 'token': parsed.secret }
    });
  }

  /* reset password User service */
  resetPassword(reset: ResetPassword, token) {
    const parsed = qs.parse(location.search); //refer to comment above
    let data = {
      "password": reset.password,
      "confirmPassword": reset.confirmPassword,
      "secret": parsed.secret
    }
    return this.http.put(`user/password-reset/${token}`, data);
  }

  updateStudent(student: Student) {
    return this.http.post("user/onboarding/details", student);
  }

  updateExStudent(exStudent: ExStudent) {
    return this.http.post("users/details/add", exStudent);
  }

  updateInterests(interests: Array<object>[]) {
    return this.http.post("user/interests", {'interestIds': interests});
  }

  getfollowingusers(userid: number) {
    return this.http.get(`user/following/${userid}`);
  }

  getfollowers(userid: number) {
    return this.http.get(`user/followers/${userid}`);
  }

  signupforbeta(signup: any) {
    return this.http.post("landing/emails", signup);
  }

  istokenvalid() {
    return this.http.post("token/verify", {});
  }

  sociallogin(login: SignInSocial) {
    return this.http.post(`user/social-login`, login);
  }
}
