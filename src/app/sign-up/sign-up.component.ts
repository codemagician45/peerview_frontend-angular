import {
  Component
} from '@angular/core';
import {
  UserModel,
  Response
} from '../shared/models';
import {
  UserService
} from  '../../services';

@Component({
  selector: 'sign-up-component',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor (private userService: UserService) {}

  protected hasAgreed: boolean = false;
  protected user: UserModel = new UserModel();

  protected onSignUp (): void {
    const splitNames = this.user.name.split(' ');
    this.user.firstName = splitNames[0];
    this.user.lastName = splitNames[1];

    this.userService.signUp(this.user)
    .subscribe((response: Response) => {
      console.log(response);
    }, (error) => {
    });
  }
}
