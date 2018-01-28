import {Component, OnInit} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import * as _ from "lodash";
import {EventService, CourseService} from "../../../services/services";
import { Event } from "../../../models/models";
import "rxjs/add/operator/map";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public items: any;
  public properties: any;

    constructor(private _eventservice: EventService, private _courseservice: CourseService, private route: ActivatedRoute) {
      this.items = [1, 2, 3, 4, 5, 6, 7, 8];
      this.properties = {
        items: window.innerWidth > 480 ? 8 : 4,
        loop: true,
        dots: false,
        nav: true,
        onChange: function () {

        }
      };
    }
    events: Event[] = [] ;
    canadiancities: any[] = [];
    cityid: Number;
    date: any = new Date();



    ngOnInit() {
     this._eventservice.getEvents().subscribe(resp => {
            this.events = resp["events"];
        },
        error => {
            console.log(error);
        }
    );
    this.route.queryParamMap
    .map(params => params.get("id") ||  "")
    .subscribe(param => {
        this.cityid = Number(param);
    });
    this._courseservice.getCountryCities().subscribe(resp => {
        this.canadiancities = _.orderBy(resp["cities"], ["name"], ["asc"]);
      })
    
    }

}
