import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: "selectedInterest", pure: false })
export class SelectedInterestPipe implements PipeTransform {
  transform(allInterests: any[]) {
    var prev_parent_value = false;
    var prev_interest: any;
    var res = [];

    allInterests.forEach(function(interest){
        if (interest.parentisselected) {
            res.push(interest);
            if (interest.interest_value!=prev_parent_value) {
                if (prev_interest) prev_interest.last_in_group = true;
                interest.parent_title = interest.interest_value;
                prev_parent_value = interest.interest_value;
            } else {
                interest.parent_title = undefined;
            }
            prev_interest = interest;
        }
    });
    return res;
  }
}

// @Pipe({ name: "day", pure: false })
// export class SelectedInterestPipe implements PipeTransform {
//   transform(allInterests: any[]) {
//     return allInterests.filter(hero => hero.parentisselected);
//   }
// }
