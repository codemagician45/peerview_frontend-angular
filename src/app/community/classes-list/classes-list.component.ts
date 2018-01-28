import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-classes-list",
    templateUrl: "./classes-list.component.html",
    styleUrls: ["./classes-list.component.scss"]
})
export class ClassesListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        if ($(window).width() > 1025) {

            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
    }


  openTab(tab) {
    const li = $('.nav-tabs').find('li');

    if (tab === 'tab1') {
      li.eq(1).removeClass('active');
      li.eq(0).addClass('active');
      $('#tab1').show();
      $('#tab2').hide();
    } else {
      li.eq(0).removeClass('active');
      li.eq(1).addClass('active');
      $('#tab1').hide();
      $('#tab2').show();
    }
  }
}
