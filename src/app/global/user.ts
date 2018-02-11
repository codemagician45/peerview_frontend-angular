import {
  UserModel
} from '../../models/models';

export class GUser {
  private static user: UserModel;

  public static setUser (user: UserModel): void {
    GUser.user = user;
  }

  public static getUser (): UserModel {
    return GUser.user;
  }
}