import {
  Component
} from '@angular/core';

import {
  UserModel
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  UserApiService
} from '../../services/api';

@Component({
  selector: 'notification-component',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {
  constructor () {}

  protected user = UserService.getUser();
}
