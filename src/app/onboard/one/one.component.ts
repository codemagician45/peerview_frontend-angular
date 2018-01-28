import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: "app-one",
    templateUrl: "./one.component.html",
    styleUrls: ["./one.component.scss"]
})
export class OneComponent {
    @Output()
    setStep: EventEmitter<string> = new EventEmitter();

}
