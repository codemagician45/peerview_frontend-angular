import {Component, OnInit, ViewChild, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
import {CourseService, AuthenticationService} from "../../../services/services";
//import { OverlayModule } from "angular-io-overlay";
//import { DatePickerModule } from "angular-io-datepicker/src/datepicker/index";
import {DateAdapter, MatDatepicker, NativeDateAdapter} from "@angular/material";
import {Student} from "../../../models/models";
declare var swal: any;
import qs from 'query-string';


@Component({
    selector: "app-two",
    templateUrl: "./two.component.html",
    styleUrls: ["./two.component.scss"],
})
export class TwoComponent implements OnInit {
    @Output()
    setStep: EventEmitter<string> = new EventEmitter();
    courses: any[] = [];
    studyLevel: any[] = [];
    model: Student;
    public customClass: string = "test-input-class";


    constructor(private router: Router,
                private _courseService: CourseService,
                private _authenticationService: AuthenticationService,
                dateAdapter: DateAdapter<NativeDateAdapter>

    ) {
        this.model = new Student();
        this.model['gender'] = 'gender';
        this.model['courseIds'] = [0];
        this.model['userStudyLevelId'] = 0;
        const parsed = qs.parse(location.search);
        if(parsed.type === "true"){
             swal('Success', 'You have verified your email!', 'success')
        }
    }

   ngOnInit() {
        this._courseService.getCourses().subscribe((resp) => {
            if (resp["status"] === 'SUCCESS') {
                this.courses = resp["courses"];
            }
        });
        this._courseService.getLevelOfStudy().subscribe(resp =>{
            this.studyLevel = resp["userStudyLevel"]
        })
    }

    onSubmit() {
       const model = this.model;
       model.courseIds = [parseInt(this.model.courseIds.toString())];
       this._authenticationService.updateStudent(model).subscribe((resp) => {
            if (resp["error"] === 'ERROR') {
                this.setStep.emit('3');
            }
        });
    }

}
