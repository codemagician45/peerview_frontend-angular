import {Component, OnInit} from "@angular/core";

import {CommunityService} from "../../../services/services";

@Component({
    selector: "app-job-center",
    templateUrl: "./job-center.component.html",
    styleUrls: ["./job-center.component.scss"]
})
export class JobCenterComponent implements OnInit {

    constructor(private _communityservice: CommunityService) {
    }
    jobs: any[] = [];
    ngOnInit() {
        if ($(window).width() > 1025) {
            const $sticky = $(".sticky");
            $sticky.css({position: "fixed", top: "86px"});
        }
        this._communityservice.getjobs().subscribe(resp => {
            this.jobs = resp["campusJobs"];
        }, error => {
            console.log(error);
        });

        
    }

}
