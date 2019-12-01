import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  JobApiService
} from '../../../../services/api';
import {
  UserService
} from '../../../../services';
import {
  UserModel,
  JobModel
} from '../../../shared/models';
import { Overlay } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-content-events-component',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class ProfileContentEventsComponent implements OnInit {
  constructor (
    private jobApiService: JobApiService,
    private overlay: Overlay,
    private route: ActivatedRoute
  ) { }

  @Input() protected user: UserModel;
  protected jobs: JobModel[] = [];
  protected isUserProfile: boolean = true;
  private otherUserSubscriber: Subscription;
  private routeSubscriber: any;

  public ngOnInit (): void {
    let currentLoginUser = UserService.getUser();

    this.otherUserSubscriber = UserService.getOtherUserSubject().subscribe((user: UserModel) => {
      this.user = user;
      this.isUserProfile = false;
    });

    if (currentLoginUser.id !== this.user.id) {
      this.isUserProfile = false;
    } else {
      this.isUserProfile = true;
    }
  }

  public ngOnDestroy (): void {
    this.otherUserSubscriber.unsubscribe();
  }
}

