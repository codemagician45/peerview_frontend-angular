import {
  Component,
  Input
} from '@angular/core';
import {
  UserModel
} from '../../shared/models';

@Component({
  selector: 'profile-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class ProfileLeftSidebarComponent {
  constructor () {}

  @Input() protected user: UserModel;
}
