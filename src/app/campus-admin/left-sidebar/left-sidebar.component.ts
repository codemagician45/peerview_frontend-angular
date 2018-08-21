import {
  Component
} from '@angular/core';

@Component({
  selector: 'left-sidebar-component',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class LeftSidebarComponent {
  constructor () {}

  protected groupManagementToggle: boolean = false;
}
