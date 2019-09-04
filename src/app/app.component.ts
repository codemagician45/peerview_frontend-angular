import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  MessageNotificationService, CheckProfileCompletionService
} from '../services';
import {
  routerTransition
} from './animations';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CompleteProfileDialogComponent } from './shared/modals/complete-profile/complete-profile-modal.component';
import { Overlay } from '@angular/cdk/overlay';
import { ProfileCompleteModel } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  constructor (
    private titleService: Title,
    private dialog: MatDialog,
    private overlay: Overlay,
    private checkProfileIncompletion: CheckProfileCompletionService
  ) {}

  protected loading: boolean;
  protected messageNotificationService: Array<any> = [];

  public ngOnInit (): void {
    MessageNotificationService.onShow.subscribe((messageNotification) => {
      this.messageNotificationService = [];
      for (let id of Object.keys(messageNotification.notifications)) {
        this.messageNotificationService.push(messageNotification.notifications[id]);
      }
    });

    this.checkProfileIncompletion.getStatus().subscribe(value => {
      if (value.status === true) {
        this.openProfileCompleteDialog(value);
      }
    });
  }

  protected getState (outlet): void {
    return outlet.activatedRouteData.state;
  }

  protected getTitle (state, parent): any {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }

    return data;
  }

  private openProfileCompleteDialog (value: ProfileCompleteModel): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'complete-profile-modal-wrapper';
    dialogConfig.id = 'CompleteProfileDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = value;
    this.dialog.open(CompleteProfileDialogComponent, dialogConfig);
  }
}
