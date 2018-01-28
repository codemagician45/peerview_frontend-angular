import {Component, OnInit} from "@angular/core";
import {CourseService, EventService} from "../../../services/services";
import * as _ from "lodash";

@Component({
    selector: "app-create",
    templateUrl: "./create.component.html",
    styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {

    public cities: any;
    public city: any = '';
    public eventtypes: any = [];
    public dresstypes: any = [];

    constructor(private courseService: CourseService, private _eventservice:EventService) {
    }

    ngOnInit() {
      this.courseService.getCountryCities().subscribe(resp => {
        this.cities = _.orderBy(resp["cities"], ["name"], ["asc"]);
      })
      this._eventservice.getEventType().subscribe(resp =>{
        this.eventtypes = resp["eventTypes"];
      })
      this._eventservice.getEventDressCode().subscribe(resp => {
        this.dresstypes = resp["eventDressCodes"];
      })
    }

}
