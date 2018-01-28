import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { BookTicketConfirmationComponent } from "../book-ticket-confirmation/book-ticket-confirmation.component";
import { EventService } from "../../../services/services";

@Component({
    selector: "app-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {

    public items: any;
    public properties: any;
    public eventid: number;
    constructor(public dialog: MatDialog, private route: ActivatedRoute, private _eventservice: EventService) {
        this.items = [1, 2, 3, 4, 5, 6, 7, 8];
        this.properties = {
            items: 1,
            loop: true,
            dots: false,
            nav: true,
            onChange: function () {

            }
        };
        this.eventid = Number(this.route.snapshot.paramMap.get("id"));
    }
    guestlist: any[] = [];
    vipguestlist: any[] = [];
    event: any;

    ngOnInit() {
        this._eventservice.getEvent(this.eventid).subscribe(resp => {
            this.event = resp["event"];

        }, error => {

        });
        this._eventservice.getGuestList(this.eventid).subscribe((resp) => {
            //console.log(resp);
            this.guestlist = resp["eventGuestList"];
        }, error => {
            console.log(error);
        });
        this._eventservice.getVipGuestList(this.eventid).subscribe((resp) => {
            //console.log(resp);
            this.vipguestlist = resp["eventVIP"];
        }, error => {
            console.log(error);
        });

        if ($(window).width() > 1025) {

            const $sticky = $(".sticky");
            $sticky.css({ position: "fixed", top: "66px" });
        }

    }

    postLink(e) {
        $(".create-poll, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-post, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    pollLink(e) {
        $(".create-post, .brain-map, .ask-question, .share-story, .guest-list").hide();
        $(".create-poll, .timeline-block").fadeIn();
        $(".post-action li").removeClass("active");
        $(e.target).closest("li").addClass("active");
    }

    openDialog() {

    }

    openBookTicketConfirmationDialog() {
      this.dialog.open(BookTicketConfirmationComponent);
    }

}

// @Component({
//     selector: "app-dialog-result-example-dialog",
//     templateUrl: "dialog-result-example-dialog.html",
// })
// export class DialogResultExampleDialogComponent {
//     constructor(public dialogRef: MatDialogRef<DialogResultExampleDialogComponent>) {
//     }
// }
