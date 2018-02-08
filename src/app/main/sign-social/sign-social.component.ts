import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SignInSocial } from '../../../models/models';
import { AuthenticationService, UserService } from '../../../services/services';
import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-sign-social',
  templateUrl: './sign-social.component.html',
  styleUrls: ['./sign-social.component.scss']
})
export class SignSocialComponent implements OnInit {
  constructor (
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    private router: Router,
    public _authSocial: AuthService
  ) {}

  @Input() protected type: string;
  @Output() protected showForm: EventEmitter<string> = new EventEmitter();
  protected isEmailButtonHidden = false;

  public ngOnInit (): void { }

  public signIn (provider): void {
    let sub = this._authSocial.login(provider).subscribe((data) => {
      let firstName = data['name'].split(' ')[0];
      let lastName = data['name'].split(' ').slice(1).join(' ');

      let obj = {
        firstName: firstName,
        lastName: lastName,
        email: data['email'],
        socialId: data['uid'],
        type: data['provider'] + 'id'
      };

      this._authenticationService.authenticateCustomerWithSocial(obj).subscribe(
        (resp) => {
          if (resp['status'] === 'SUCCESS') {
            let user = resp['user'];
            this._userService.setLoggedInUser(user);
            this.router.navigate(['/home']);
          } else {
            alert(resp['Message']);
          }
        },
        (error) => {
          alert(error.error.error);
        }
      );
    });
  }

  public showEmailForm (): void {
    this.isEmailButtonHidden = true;
    this.showForm.emit();
    setTimeout(() => {
      $('.page-bg.hero-page').animate({ scrollTop: $('.email-sign-form').position().top }, 300);
    }, 100);
  }
}
