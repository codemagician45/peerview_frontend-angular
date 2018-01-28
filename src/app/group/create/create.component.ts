import {Component, OnInit} from "@angular/core";
import {CommunityService} from "../../../services/services";

@Component({
    selector: "app-create",
    templateUrl: "./create.component.html",
    styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
    public group: any = {};
    constructor(private _communityservice: CommunityService) {
    }

    ngOnInit() {
    }

    creategroup() {
        this._communityservice.creategroup(this.group).subscribe(resp => {
            console.log(resp);
            if(resp["error"] === false) {
                alert(resp["Message"]);
                this.group = {};
            }
        }, error => {
            console.error("Error Creating Posts");
            console.error(error);
        });
    }
}
