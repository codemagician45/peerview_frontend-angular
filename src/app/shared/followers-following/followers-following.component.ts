import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-followers-following',
  templateUrl: './followers-following.component.html',
  styleUrls: ['./followers-following.component.css']
})
export class FollowersFollowingComponent implements OnInit {
  constructor (
    private route: ActivatedRoute
  ) {}

  public ngOnInit (): void {
    let type = this.route.snapshot.paramMap.get('type') || 'following';

    this.openTab(type);
  }

  protected openTab (tab): void {
    const li = $('.nav-tabs').find('li');
    if (tab === 'following') {
      li.eq(1).removeClass('active');
      li.eq(0).addClass('active');
      $('#following').show();
      $('#followers').hide();
    } else {
      li.eq(0).removeClass('active');
      li.eq(1).addClass('active');
      $('#following').hide();
      $('#followers').show();
    }
  }
}
