import {
  Component,
  Input
} from '@angular/core';
import {
  UserModel
} from '../../../shared/models';
import{
  UserApiService
} from '../../../../services/api/user.api.service';

@Component({
  selector: 'home-left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class HomeLeftSidebarComponent {
  constructor (
    private userApiService: UserApiService
  ) {}

  @Input() protected user: UserModel;
}
