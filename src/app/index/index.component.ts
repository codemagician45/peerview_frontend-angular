import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  UserService
} from '../../services/services';
import * as $ from 'jquery';
@Component({
  selector: 'index-component',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor (
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit (): void {}
}
