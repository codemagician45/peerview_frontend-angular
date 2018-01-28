import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-edit-interest-modal',
  templateUrl: './edit-interest-modal.component.html',
  styleUrls: ['./edit-interest-modal.component.css']
})
export class EditInterestModalComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

  update() {
    console.log("Update Interests Commencing");
  }

}
