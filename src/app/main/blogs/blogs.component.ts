import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  navName: string = 'blogs';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    $('body')
      .removeClass('_bg_white')
      .addClass('_bg_gray');

    this.route
      .data
      .subscribe(data => {
        this.navName = data['name'];
      });
  }

  faceBookShare() {
    const href = location.href;
    const title = document.title;
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(href)+'&t='+encodeURIComponent(title),'sharer','toolbar=0,status=0,width=626,height=436');
  }
  twitterShare() {
    const text = $('.blogs__post-heading').text();
    const href = location.href;
    window.open('https://twitter.com/intent/tweet?text=' + text + ' ' + href);
  }
  googleShare() {
    const text = $('.blogs__post-heading').text();
    const href = location.href;
    window.open('https://plus.google.com/share?url=' + href + '');
  }

}
