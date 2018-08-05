import {
  UserModel
} from '../app/shared/models';

export class UserService {
  private static user: UserModel;

  public static setUser (user: UserModel): void {
    UserService.user = user;
  }

  public static getUser (): UserModel {
    return UserService.user;
  }
}
