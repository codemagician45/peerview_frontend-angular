import {Component, OnInit, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import * as $ from "jquery";
import {ScrollSpyService} from 'ngx-scrollspy';
import {UserService} from "../../../services/services";

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit, AfterViewInit {

    public items: any;
    public properties: any;

    constructor(
      private userservice: UserService,
      private router: Router,
      private scrollSpyService: ScrollSpyService
    ) {
    }

    ngAfterViewInit() {
      const forumTop = $("#forum").offset().top;
      const newsTop = $("#news").offset().top;
      const eventsTop = $("#events").offset().top;
      const communityTop = $("#community").offset().top;

      const stickyMenuItemForum = $('#sticky-menu-item-forum');
      const stickyMenuItemNews = $('#sticky-menu-item-news');
      const stickyMenuItemEvents = $('#sticky-menu-item-events');
      const stickyMenuItemCommunity = $('#sticky-menu-item-community');

      const stickyMenuItems = $('.sticky-menu-item');

      this.scrollSpyService.getObservable('window').subscribe((e: any) => {
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

    ngOnInit() {
        if (this.userservice.isAuthenticated()) {
            this.router.navigate(["/home"]);
        }
        this.items = [1, 2, 3, 4, 5, 6, 7, 8];
        this.properties = {
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            onChange: function () {

            }
        };

        $(window).scroll(function () {
            sitckyHeader();
        });

        function sitckyHeader() {
            const window_top = $(window).scrollTop();
            var offset = $("#sticky-anchor").offset();
            var div_top = offset ? offset.top : 0;
            if (window_top > div_top) {
                $("#sticky").addClass("stick");
                $("#sticky-anchor").height($("#sticky").outerHeight());
            } else {
                $("#sticky").removeClass("stick");
                $("#sticky-anchor").height(0);
            }
        }
    }

    gotoSection(hash) {
        $("html,body").animate({scrollTop: $("#" + hash).offset().top}, "slow");
    }

    titleOpen(e) {
        $(e.target).toggleClass("open");
        $(e.target).closest(".inline-widget").find(".inline-content").slideToggle();
    }

    accordionOpen(e) {
        $(e.target).toggleClass("open");
        $(e.target).closest("li").find(".accordion-description").slideToggle();
    }

    tab(e, number) {
        const that = $(e.target);

        $(".containers").hide();
        $("#container" + number).fadeIn();
        $("#container" + number).addClass("in");
        $(".inline-tabs li").removeClass();
        that.parent().addClass("active");

        return false;
    }
}
