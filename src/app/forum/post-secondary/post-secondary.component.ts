import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-post-secondary",
    templateUrl: "./post-secondary.component.html",
    styleUrls: ["./post-secondary.component.scss"]
})
export class PostSecondaryComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() < 1025) {

        } else {
            const $sticky = $(".sticky");
            const $stickyrStopper = $(".sticky-stopper");
            if (!!$sticky.offset()) { // make sure ".sticky" element exists

                const generalSidebarHeight = $sticky.innerHeight();
                const stickyTop = $sticky.offset().top;
                const stickOffset = 0;
                const stickyStopperPosition = $stickyrStopper.offset().top;
                const stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
                const diff = stopPoint + stickOffset;

                $(window).scroll(function () { // scroll event
                    const windowTop = $(window).scrollTop(); // returns number

                    if (stopPoint < windowTop) {
                        $sticky.css({position: "absolute", top: diff});
                    } else if (stickyTop < windowTop + stickOffset) {
                        $sticky.css({position: "fixed", top: "77px"});
                    } else {
                        $sticky.css({position: "absolute", top: "0px"});
                    }
                });
            }
        }
    }

}
