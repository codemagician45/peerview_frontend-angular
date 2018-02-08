import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  constructor (private route: ActivatedRoute) {}

  protected navName: string = 'blogs';

  public ngOnInit (): void {
    $('body')
    .removeClass('_bg_white')
    .addClass('_bg_gray');

    this.route
    .data
    .subscribe(data => {
      this.navName = data['name'];
    });
  }

  protected faceBookShare (): void {
    const href = location.href;
    const title = document.title;
    window.open('http://www.facebook.com/sharer.php?u='
    + encodeURIComponent(href) + '&t='
    + encodeURIComponent(title), 'sharer', 'toolbar=0,status=0,width=626,height=436');
  }

  protected twitterShare (): void {
    const text = $('.blogs__post-heading').text();
    const href = location.href;
    window.open('https://twitter.com/intent/tweet?text=' + text + ' ' + href);
  }

  protected googleShare (): void {
    const text = $('.blogs__post-heading').text();
    const href = location.href;
    window.open('https://plus.google.com/share?url=' + href + '');
  }
}
