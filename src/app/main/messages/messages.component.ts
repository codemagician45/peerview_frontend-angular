import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {NewMessageFormComponent} from "../../shared/new-message-form/new-message-form.component";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    constructor(public dialog: MatDialog) {}

    new_message_form_shown = true;
    dialog_shown = false;

    ngOnInit() {

    }

    showNewMessageForm() {
      this.dialog_shown = false;
      this.new_message_form_shown = true;
    }

    showDialog() {
      this.dialog_shown = true;
      this.new_message_form_shown = false;
    }
}
