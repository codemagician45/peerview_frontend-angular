import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BookTicketConfirmationComponent } from '../book-ticket-confirmation/book-ticket-confirmation.component';
import { EventService } from '../../../services/services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor (
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _eventservice: EventService
  ) {
    this.items = [1, 2, 3, 4, 5, 6, 7, 8];
    this.properties = {
      items: 1,
      loop: true,
      dots: false,
      nav: true,
      onChange: function (): void {}
    };

    this.eventid = Number(this.route.snapshot.paramMap.get('id'));
  }

  private eventid: number;
  protected items: any;
  protected properties: any;
  protected guestlist: any[] = [];
  protected vipguestlist: any[] = [];
  protected event: any;

  public ngOnInit (): void {
    this._eventservice.getEvent(this.eventid)
    .subscribe((response: any) => {
      this.event = response.event;
    }, error => {
    });

    this._eventservice.getGuestList(this.eventid)
    .subscribe((response: any) => {
      this.guestlist = response.eventGuestList;
    }, error => {
      console.log(error);
    });

    this._eventservice.getVipGuestList(this.eventid)
    .subscribe((response: any) => {
      this.vipguestlist = response.eventVIP;
    }, error => {
      console.log(error);
    });

    if ($(window).width() > 1025) {
      const $sticky = $('.sticky');
      $sticky.css({ position: 'fixed', top: '66px' });
    }
  }

  protected postLink (e): void {
    $('.create-poll, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-post, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected pollLink (e): void {
    $('.create-post, .brain-map, .ask-question, .share-story, .guest-list').hide();
    $('.create-poll, .timeline-block').fadeIn();
    $('.post-action li').removeClass('active');
    $(e.target).closest('li').addClass('active');
  }

  protected openDialog (): void {}

  protected openBookTicketConfirmationDialog (): void {
    this.dialog.open(BookTicketConfirmationComponent);
  }
}
