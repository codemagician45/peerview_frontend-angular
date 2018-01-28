import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-about-me-modal',
  templateUrl: './about-me-modal.component.html',
  styleUrls: ['./about-me-modal.component.scss']
})
export class AboutMeModalComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  cancel() {
    this.dialog.closeAll();
  } 
  submit() {

  }
}
