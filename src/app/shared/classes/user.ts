import {
  UserModel
} from '../models';

export class UserClass {
  private static user: UserModel;

  public static setUser (user: UserModel): void {
    console.log('setUser');
    console.log(user);
    UserClass.user = user;
  }

  public static getUser (): UserModel {
    return UserClass.user;
  }
}
