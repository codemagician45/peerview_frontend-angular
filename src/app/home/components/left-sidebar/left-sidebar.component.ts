import {
  Component,
  Input
} from '@angular/core';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'home-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class HomeLeftSidebarComponent {
  constructor () {}

  @Input() protected user: UserModel;
}
