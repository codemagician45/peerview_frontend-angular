import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
    navName: string = 'contact';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.route
        .data
        .subscribe(data => {
          this.navName = data['name'];
        });
    }

}
