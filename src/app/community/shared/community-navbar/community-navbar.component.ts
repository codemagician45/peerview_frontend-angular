import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-community-navbar',
  templateUrl: './community-navbar.component.html',
  styleUrls: ['./community-navbar.component.scss']
})
export class CommunityNavbarComponent implements OnInit {
  constructor () {}

  @Input('active') protected active: string;
  public dropDownOpen;

  public ngOnInit (): void {
    $(window).scrollTop(0);
  }

  protected toggle (e): boolean {
    e.preventDefault();
    this.dropDownOpen = !this.dropDownOpen;
    return false;
  }
}
