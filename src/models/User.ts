import {
  Course
} from './Course';

export class User {
  constructor (
    public firstname: String,
    public lastname: String,
    public email: String,
    public isactive: boolean,
    public token: string,
  ) {}

  public id: number;
}

export class UserOnboardingDetails {
  public courseIds: number[];
  public userStudyLevelId: number;
  public userTypeId: number;
  public schoolName: string;
  public city: string;
  public gender: string;
  public role: string;
  public company: string;
  public birthDate: Date;
  public institutionName: string;
  public yearOfIncorporation: string;
  public website: string;
}

export class UserModel {
  public id: number;
  public firstName?: string;
  public lastname: string;
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
  public course: Course;
}
