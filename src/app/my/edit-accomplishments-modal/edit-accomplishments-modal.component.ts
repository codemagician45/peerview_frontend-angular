import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-edit-accomplishments-modal',
  templateUrl: './edit-accomplishments-modal.component.html',
  styleUrls: ['./edit-accomplishments-modal.component.css']
})
export class EditAccomplishmentsModalComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

}
