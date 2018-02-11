import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ScrollSpyService
} from 'ngx-scrollspy';
import {
  UserService
} from '../../../services/services';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  constructor (
    private userService: UserService,
    private router: Router,
    private scrollSpyService: ScrollSpyService
  ) {}

  public items: any;
  public properties: any;

  public ngAfterViewInit (): void {
    const forumTop = $('#forum').offset().top;
    const newsTop = $('#news').offset().top;
    const eventsTop = $('#events').offset().top;
    const communityTop = $('#community').offset().top;
    const stickyMenuItemForum = $('#sticky-menu-item-forum');
    const stickyMenuItemNews = $('#sticky-menu-item-news');
    const stickyMenuItemEvents = $('#sticky-menu-item-events');
    const stickyMenuItemCommunity = $('#sticky-menu-item-community');
    const stickyMenuItems = $('.sticky-menu-item');

    this.scrollSpyService.getObservable('window')
    .subscribe((e: any) => {
      const currentPosition = window.scrollY;

      stickyMenuItems.removeClass('active');

      if ((currentPosition > forumTop) && (currentPosition < newsTop)) {
        stickyMenuItemForum.addClass('active');
      } else if ((currentPosition > newsTop) && (currentPosition < eventsTop)) {
        stickyMenuItemNews.addClass('active');
      } else if ((currentPosition > eventsTop) && (currentPosition < communityTop)) {
        stickyMenuItemEvents.addClass('active');
      } else if (currentPosition > communityTop) {
        stickyMenuItemCommunity.addClass('active');
      }
    });
  }

  public ngOnInit (): void {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.items = [1, 2, 3, 4, 5, 6, 7, 8];
    this.properties = {
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      onChange: function (): void {}
    };

    $(window).scroll(function (): void {
      sitckyHeader();
    });

    function sitckyHeader (): void {
      const window_top = $(window).scrollTop();
      let offset = $('#sticky-anchor').offset();
      let div_top = offset ? offset.top : 0;
      if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight());
      } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
      }
    }
  }

  protected gotoSection (hash): void {
    $('html,body').animate({ scrollTop: $('#' + hash).offset().top }, 'slow');
  }

  protected titleOpen (e): void {
    $(e.target).toggleClass('open');
    $(e.target).closest('.inline-widget').find('.inline-content').slideToggle();
  }

  protected accordionOpen (e): void {
    $(e.target).toggleClass('open');
    $(e.target).closest('li').find('.accordion-description').slideToggle();
  }

  protected tab (e, index): boolean {
    const that = $(e.target);

    $('.containers').hide();
    $('#container' + index).fadeIn();
    $('#container' + index).addClass('in');
    $('.inline-tabs li').removeClass();
    that.parent().addClass('active');

    return false;
  }
}
