import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {
  Title
} from '@angular/platform-browser';
import {
  MessageNotificationService
} from '../services';
import {
  UserApiService,
} from '../services/api';
import {
  UserClass
} from './shared/classes';
import {
  routerTransition
} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userApiService: UserApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: Title) {
    /**************Loader Function Intialize on change Router***********************/
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.loading = true;
        console.log('start');
      } else if (val instanceof NavigationEnd) {
        console.log('end');
        console.log(this.getTitle(router.routerState, router.routerState.root).join('-'));
        this.loading = false;
      }
    });
  }

  protected loading: boolean;
  protected messageNotificationService: Array<any> = [];

  public ngOnInit (): void {
    MessageNotificationService.onShow.subscribe((messageNotification) => {
      this.messageNotificationService = [];
      for (let id of Object.keys(messageNotification.notifications)) {
        this.messageNotificationService.push(messageNotification.notifications[id]);
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
}
