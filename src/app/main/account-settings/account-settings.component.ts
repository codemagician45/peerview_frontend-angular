import {
  Component,
  OnInit,
  NgModule
} from '@angular/core';
import {
  AccountSettingService,
  CourseService,
  UserService
} from '../../../services/services';
import {
  AccountSetting
} from '../../../models/models';
import {
  DateAdapter,
  NativeDateAdapter,
  MatDatepickerModule
} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  constructor (
    private _accountsettingservice: AccountSettingService,
    private _userservice: UserService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private _courseservice: CourseService
  ) {
    this.dateAdapter.setLocale('en-EN');
  }

  public active: string = 'general';
  public isNewCardOpen = false;
  protected languages: any[] = [];
  protected courses: any[] = [];
  protected passwordchange = {};
  protected pagemodel = {};

  public ngOnInit (): void {
    let self = this;
    this._accountsettingservice.getAccountSetting()
    .subscribe((response: any) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

    this.languages = this._courseservice.getlanguages();
    this._courseservice.getCourses().subscribe((response: any) => {
      console.log(response);
    });

    $('.tabChange').click(function (e): void {
      const that = $(this);
      const panel = that.data('tab-name');
      self.active = panel;
      $('.tab-pane').removeClass('active');
      $('#' + panel).addClass('active');
      that.addClass('active');
    });
  }

  protected openEdit (e): void {
    $(e.target).hide();
    $(e.target).closest('li').find('.setting-value').hide();
    $(e.target).closest('li').find('.edit-field').fadeIn();
    $('#general-action').fadeIn();
  }

  protected cancelEdit (): void {
    $('.setting-value').show();
    $('.edit-field').hide();
    $('#general-action').hide();
    $('.setting-edit').fadeIn();
  }

  protected changepassword (): void {
    this._accountsettingservice.updatepassword(this.passwordchange)
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  protected updatesecurityandprivacy (): void {
    const model = {
      protect_post: this.pagemodel['protect_post'],
      contact_privacy: this.pagemodel['contact_privacy'],
      profile_privacy: this.pagemodel['profile_privacy']
    };

    this._accountsettingservice.updatesecurityandprivacy(this._userservice.loggedInUser ? this._userservice.loggedInUser.id : 0, model)
    .subscribe(resp => {
      console.log(resp);
    }, error => {
      console.log(error);
    });
  }

  protected unblockuser (user: any): void {
    console.log(user);
    let userindex = this.pagemodel['blocked'].indexOf(user);
    console.log(userindex);
    this.pagemodel['blocked'].splice(userindex, 1);
    this._accountsettingservice.unblockuser(user.blocked_by, { 'unblock_id': user.blocked })
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  protected updateuser (): void {
    this._accountsettingservice.updateuser(this.pagemodel)
    .subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
