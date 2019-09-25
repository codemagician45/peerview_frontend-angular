import {
  UserModel
} from '../app/shared/models';
import { Subject, Observable } from 'rxjs';

export class UserService {
  private static user: UserModel;
  private static otherUser: UserModel;
  private static otherUserSubject = new Subject<UserModel>();

  public static setUser (user: UserModel): void {
    UserService.user = user;
  }

  public static getUser (): UserModel {
    return UserService.user;
  }

  public static setOtherUser (user: UserModel): void {
    UserService.otherUser = user;
  }

  public static getOtherUser (): UserModel {
    return UserService.otherUser;
  }

  public static setOtherUserSubject (user: UserModel): void {
    this.otherUserSubject.next(user);
  }

  public static getOtherUserSubject (): Observable<UserModel> {
    return this.otherUserSubject.asObservable();
  }
}
