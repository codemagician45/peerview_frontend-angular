import {
  CourseModel
} from './course';

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public name?: string;
  public confirmPassword?: string;
  public password: string;
  public email: string;
  public language: string;
  public aboutMe: string;
  public accomplishments: string;
  public token: string;
  public tokenActiveDate: Date;
  public isSuspended: boolean;
  public profilePicture: string;
  public profilePrivacy: boolean;
  public protectPost: boolean;
  public userPrivacyId: number;
  public facebookId: string;
  public linkedinId: string;
  public googleId: string;
  public schoolName: string;
  public birthDate: Date;
  public city: string;
  public gender: string;
  public role: string;
  public company: string;
  public institutionName: string;
  public yearOfIncorporation: Date;
  public website: string;
  public course: CourseModel;
}
