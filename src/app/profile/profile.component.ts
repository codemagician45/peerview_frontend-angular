import {
  Component
} from '@angular/core';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor () {}

  protected mobileLinkSelected: string = 'timeline';

  public onClickSelectMobileLink (type): void {
    this.mobileLinkSelected = type;
  }
}
