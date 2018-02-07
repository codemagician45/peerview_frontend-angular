import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-using-community',
  templateUrl: './using-community.component.html',
  styleUrls: ['./using-community.component.scss']
})
export class UsingCommunityComponent implements OnInit {
  constructor () {}

  public header = 'Using the Online Campus';
  public sub_header = '';

  public ngOnInit (): void {}
}
