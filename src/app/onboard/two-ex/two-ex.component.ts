import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
//import { DatePickerModule } from "angular-io-datepicker/src/datepicker/index";
import {ExStudent } from "../../../models/models";
import {AuthenticationService, CourseService } from "../../../services/services";
import * as _ from "lodash";

@Component({
    selector: "app-two-ex",
    templateUrl: "./two-ex.component.html",
    styleUrls: ["./two-ex.component.scss"]
})
export class TwoExComponent implements OnInit {
    @Output()
    setStep: EventEmitter<string> = new EventEmitter();

    constructor(private _authenticationService: AuthenticationService,
                private _courseservice: CourseService,
                private router: Router) {
    }
    model = new ExStudent();
    courses = [];
    ngOnInit() {
        this._courseservice.getCourses().subscribe((resp) => {
            this.courses = _.orderBy(resp["courses"], ["course"], ["asc"]);
        });
    }

    addExpertise() {
        this.model.expertiseArray.push(this.model.expertise);
        this.model.expertise = "";
    }
    removeExpertise(item: string) {
        console.log(item);
        const index = this.model.expertiseArray.indexOf(item);
        if (index > -1) {
            this.model.expertiseArray.splice(index, 1);
         }
    }

    onSubmit() {
        this.model.expertise = JSON.stringify(this.model.expertiseArray);
        console.log(JSON.stringify(this.model));
        this._authenticationService.updateExStudent(this.model).subscribe((resp) => {
            console.log(resp);
            if (resp["error"] === false) {
                this.setStep.emit('3');
            }
        }, (error) => {
            console.log(error);
        });
    }

}
