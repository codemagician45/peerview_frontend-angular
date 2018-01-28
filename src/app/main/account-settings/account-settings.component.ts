import {Component, OnInit, NgModule} from "@angular/core";
import { AccountSettingService, CourseService, UserService } from "../../../services/services";
import * as $ from "jquery";
import {AccountSetting} from "../../../models/models";
import {DateAdapter, NativeDateAdapter, MatDatepickerModule} from "@angular/material";

@Component({
    selector: "app-account-settings",
    templateUrl: "./account-settings.component.html",
    styleUrls: ["./account-settings.component.scss"]
})
export class AccountSettingsComponent implements OnInit {
    public active: string = 'general';
    public isNewCardOpen = false;
    //public accountsetting: AccountSetting = new AccountSetting("", "", "", "", "24/07/1992");

    constructor(private _accountsettingservice: AccountSettingService, private _userservice:UserService, dateAdapter: DateAdapter<NativeDateAdapter>
    , private _courseservice: CourseService) {
        dateAdapter.setLocale("en-EN");
    }
    languages: any[] = [];
    courses: any[] = [];
    passwordchange = {};
    pagemodel = {};
    ngOnInit() {
        let self = this;
        this._accountsettingservice.getAccountSetting().subscribe((resp) => {
        console.log(resp);
        if (resp["error"] === false) {
            const b = resp["Settings"][0];
            console.log(b);
            this.pagemodel = b;
            //this.accountsetting = new AccountSetting(b["first_name"], b["last_name"], b["email"], b["language"], b["date_birth"]);
        }

    }, (error) => {
        console.log(error);
    });
    this.languages = this._courseservice.getlanguages();
    this._courseservice.getCourses().subscribe((resp) => {
        this.courses = resp["courses"];
        if(this.pagemodel["course_id"] !== undefined && this.pagemodel["course_id"] > 0) {
            this.pagemodel["course_name"]=this.courses.filter(x=> x.id == this.pagemodel["course_id"])[0].course;
        }
        
    });
        $(".tabChange").click(function (e) {
            const that = $(this);
            const panel = that.data("tab-name");
            self.active = panel;
            $(".tab-pane").removeClass("active");
            $("#" + panel).addClass("active");
            that.addClass("active");
        });
    }

    openEdit(e) {
        $(e.target).hide();
        $(e.target).closest("li").find(".setting-value").hide();
        $(e.target).closest("li").find(".edit-field").fadeIn();
        $("#general-action").fadeIn();
        console.log($(e.target).parent());
    }

    cancelEdit() {
        $(".setting-value").show();
        $(".edit-field").hide();
        $("#general-action").hide();
        $(".setting-edit").fadeIn();
    }
    changepassword() {
        console.log(this.passwordchange);
        this._accountsettingservice.updatepassword(this.passwordchange).subscribe( resp => {
            alert("Password Changed Successfully");
        }, error => {
            console.log(error);
        });
    }

    updatesecurityandprivacy() {
        const model =  {protect_post: this.pagemodel["protect_post"], contact_privacy: this.pagemodel["contact_privacy"], profile_privacy: this.pagemodel["profile_privacy"]};
        this._accountsettingservice.updatesecurityandprivacy(this._userservice.loggedInUser ? this._userservice.loggedInUser.id : 0, model)
            .subscribe(resp => {
                console.log(resp);
            }, error => {
                console.log(error);
            });
    }
    unblockuser(user: any) {
        console.log(user);
        let userindex= this.pagemodel["blocked"].indexOf(user);
        console.log(userindex);
        this.pagemodel["blocked"].splice( userindex, 1 );
        this._accountsettingservice.unblockuser(user.blocked_by, {"unblock_id": user.blocked}).subscribe(resp => {
            console.log(resp);
        }, error => {
            console.log(error);
        })
    }
    updateuser() {
        console.log(this.pagemodel);
        this.pagemodel["course"] = this.pagemodel["course_id"];
        this.pagemodel["current_employment_place"] = this.pagemodel["employment_place"];
        if(this.pagemodel["DOB"].includes("T")){
            this.pagemodel["DOB"] = this.pagemodel["DOB"].split("T")[0];
        }

        this._accountsettingservice.updateuser(this.pagemodel).subscribe(resp => {
            console.log(resp);
            if(resp["error"] === false) {
                alert(resp["Message"]);
            }
        }, error => {
            console.log(error);
        })
    }
}
