import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProfileCompleteModel } from '../app/shared/models';

@Injectable({ providedIn: 'root' })
export class CheckProfileCompletionService {
  private isProfileNotCompleted = new Subject<ProfileCompleteModel>();

  public setStatus (profileCompleteStatus: ProfileCompleteModel): void {
    this.isProfileNotCompleted.next(profileCompleteStatus);
  }

  public getStatus (): Observable<ProfileCompleteModel> {
    return this.isProfileNotCompleted.asObservable();
  }
}
