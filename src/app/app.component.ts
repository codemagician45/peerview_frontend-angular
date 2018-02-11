import {
  Component,
  OnInit
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
  AccountSettingService
} from '../services/services';
import {
  UserResponse
} from '../models/models';
import {
  GUser
} from './global/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountSettingService: AccountSettingService,
    private titleService: Title) {
    /**************Loader Function Intialize on change Router***********************/
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.loading = true;
      } else if (val instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    /*************Get Title from route*********************/
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(router.routerState, router.routerState.root).join('-');
        titleService.setTitle(title);
      }
    });
  }

  protected loading: boolean;

  public ngOnInit (): void {
    this.accountSettingService.getUserProfile()
    .subscribe((response: UserResponse) => {
      GUser.setUser(response.user);
    });
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
