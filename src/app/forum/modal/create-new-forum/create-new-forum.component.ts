import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-create-new-forum',
  templateUrl: './create-new-forum.component.html',
  styleUrls: ['./create-new-forum.component.css']
})
export class CreateNewForumComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.dialog.closeAll();
  }
}
