import {Component, OnInit} from "@angular/core";
import {CommunityService} from "../../../services/services";
@Component({
    selector: "app-student-home",
    templateUrl: "./student-home.component.html",
    styleUrls: ["./student-home.component.scss"]
})
export class StudentHomeComponent implements OnInit {

    constructor(private _communityservice: CommunityService) {
    }
    publicgroups: any[] = [
      {
        name: 'Public group name 1',
        description: 'Public group description 1'
      },
      {
        name: 'Public group name 2',
        description: 'Public group description 2'
      }
      ];
    mygroups: any[] = [
      {
        name: 'My group name 1',
        description: 'My group description 1'
      },
      {
        name: 'My group name 2',
        description: 'My group description 2'
      }
    ];
    ngOnInit() {
       this._communityservice.getuserclubs().subscribe(resp => {
            this.mygroups = resp["campusStudentGroups"];
        }, error => {
            console.log(error);
        });
        this._communityservice.getsocietyclubs().subscribe(resp => {
            this.publicgroups = resp["campusStudentGroups"];
        }, error => {
            console.log(error);
        });
    }

}
