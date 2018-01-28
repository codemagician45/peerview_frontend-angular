import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";


@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
  providers: [
    // { provide: MAT_DIALOG_DATA, useValue: {}}
  ]
})
export class ShowImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router) { }

  ngOnInit() {

  }

  accountPage(){
    this.router.navigate(['account-settings']);
   }
}
