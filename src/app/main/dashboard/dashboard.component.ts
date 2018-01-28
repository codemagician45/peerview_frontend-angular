import {Component, OnInit} from "@angular/core";
import {DateAdapter, NativeDateAdapter} from "@angular/material";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

    constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {

        dateAdapter.setLocale("en-EN");
    }

    ngOnInit() {
    }

}
