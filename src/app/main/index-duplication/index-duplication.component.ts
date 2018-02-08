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
  UserService,
  AuthenticationService
} from '../../../services/services';
import * as $ from 'jquery';

@Component({
  selector: 'app-index-duplication',
  templateUrl: 'index-duplication.component.html',
  styleUrls: ['index-duplication.component.scss']
})
export class IndexDuplicationComponent implements OnInit, AfterViewInit {
  constructor (
    private userservice: UserService,
    private router: Router,
    private scrollSpyService: ScrollSpyService,
    private _authenticationservice: AuthenticationService
  ) {}

  public items: any;
  public properties: any;
  public signup: any;

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
    this.items = [1, 2, 3, 4, 5, 6, 7, 8];
    this.properties = {
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      onChange: function (): void {}
    };
    this.signup = { 'email': '', success: false };

    $(window).scroll(function (): void {
      sitckyHeader();
    });

    function sitckyHeader (): void {
      const window_top = $(window).scrollTop();
      const div_top = $('#sticky-anchor').offset().top;
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

  protected gotoTop (): void {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }

  protected tab (e, number): boolean {
    const that = $(e.target);
    $('.containers').hide();
    $('#container' + number).fadeIn();
    $('#container' + number).addClass('in');
    $('.inline-tabs li').removeClass();
    that.parent().addClass('active');

    return false;
  }

  protected signupforbeta (): void {
    this._authenticationservice.signupforbeta(this.signup)
    .subscribe((response: any) => {
      this.signup.success = true;
    }, (error) => {

    });
  }
}
