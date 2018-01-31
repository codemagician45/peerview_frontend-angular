import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import * as _ from "lodash";
import { CourseService, AuthenticationService } from "../../../services/services";

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {
  interests: any[] = [];
  subinterests: any[] = [];
  term = '';
  searchResult: any = [];
  maxSelectedInterestsCount = 5;
  selectedInterests: any[] = [];
  maxSelectedSubInterestsCount = 4;

  constructor(private _courseService: CourseService,
    private _authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this._courseService.getInterest().subscribe((resp) => {
      const a = _.map(resp["interestCategory"], (value: any, key) => {
        this.interests.push({ "id": value.id, "value": value.name });
        const parsedValues: any[] = [];

        // value.map((currentItem) => {
        //     // console.log(currentItem);
        //     parsedValues.push({"id": currentItem["subinterest_id"],
        //     "value": currentItem["subinterest_title"], interestid: currentItem["interest_id"], interest_value:key, parentisselected: false});
        // });
        this.subinterests = _.union(this.subinterests, parsedValues);
      });

      this.interests = _.orderBy(this.interests, ["value"], ["asc"]);
      this.subinterests = _.orderBy(this.subinterests, ["interest_value", "value"], ["asc", "asc"]);
      this.subinterests = _.pull(this.subinterests, { "value": "" });
    });

  }

  toggleInterest(interest: any) {
    interest.isselected = !interest.isselected;
    this.selectedInterests = this.interests.filter(function(item) { return item.isselected; });
    this.selectedInterests.forEach((item, i) => {
      if (this.selectedInterests.length > 0) {
        const catId = item.id;
        this._courseService.getSubInterest(catId).subscribe((resp) => {
          this.selectedInterests[i]['subinterests'] = resp["interests"];

          this.subinterests.forEach((item) => {
            console.log('item', item)
            if (item.interestid === interest.id) {
              item.parentisselected = interest.isselected;
              if (!interest.isselected) {
                item.isselected = false;
                item.isdisabled = false;
              }
            }
          });
        });
      }
    });

    // this.subinterests.forEach((item) => {
    //     console.log("anmol",item)
    //          if (item.interestid === interest.id) {
    //              item.parentisselected = interest.isselected;
    //              if (!interest.isselected) {
    //                  item.isselected = false;
    //                  item.isdisabled = false;
    //              }
    //
    //          }
    //      });
    //      this.subinterests = this.subinterests;
    //      console.log(this.subinterests,"xcfvdfdsf")
  }

  toggleSubInterest(subinterest, selectedIndex) {
    // console.log(this.selectedInterests, subinterest, selectedIndex)
    const sI = _.findIndex(this.selectedInterests[selectedIndex]['subinterests'], subinterest);
    // console.log(sI, "sI")
    let interest = this.interests.filter(interest => {
      // console.log(this.subinterests[sI].id,sI,"sI")
      return interest.id == this.selectedInterests[selectedIndex].id;
    })[0];

    if (!interest.isselected && this.selectedInterests.length >= this.maxSelectedInterestsCount) {
      return false;
    }

    if (!interest.isselected) {
      this.toggleInterest(interest);
    }

    this.selectedInterests[selectedIndex]['subinterests'][sI].isselected = !this.selectedInterests[selectedIndex]['subinterests'][sI].isselected;

    this.selectedInterests[selectedIndex]['subinterests'].forEach(
      function(subinterest) {
        subinterest.isdisabled = this.getSelectedSubinterestsCountInGroup(subinterest) >= this.maxSelectedSubInterestsCount && !subinterest.isselected;
      }.bind(this)
    );
  }

  submitInterests() {
    let finalInterestsHandler = [];
    for (let fI = 0; fI < this.selectedInterests.length; fI++) {
      const finalInterests = _.filter(this.selectedInterests[fI]['subinterests'], (item) => {
        return item.isselected === true;
      }).map((item) => {
        return item['id'];
      });

      finalInterestsHandler.push(finalInterests);
    }

    finalInterestsHandler = [].concat.apply([], finalInterestsHandler)
    finalInterests = finalInterestsHandler;

    if (finalInterests.length < 5) {
      alert("At Least Five Sub Interests are required");
    } else {
      this._authenticationService.updateInterests(finalInterests).subscribe((resp) => {
        console.log(resp);
        if (resp['status'] === 'SUCCESS' && resp['http_code'] === 201) {
          this.router.navigate(["/home"]);
        }
      }, (error) => {
        console.log(error);
      });
    }
    // console.log(finalInterests);
  }

  getInterestClass(interest) {
    return 'list-' + interest.value.toLowerCase().replace(/\s+/g, "-").replace(/[^0-9a-zA-Z\-]/g, "");
  }

  search() {
    let searchResult = {};

    if (!this.term) {
      this.searchResult = [];
      return false;
    }
    this.interests
      .filter(interest => {
        return interest.value && ~interest.value.toLowerCase().indexOf(this.term.toLowerCase());
      })
      .forEach(interest => {
        searchResult[interest.id] = interest;
        searchResult[interest.id].subinterests = [];
      });

    this.subinterests
      .filter(subinterest => {
        return subinterest.value && ~subinterest.value.toLowerCase().indexOf(this.term.toLowerCase());
      })
      .forEach(subinterest => {
        let interest = this.interests.filter((interest) => { return subinterest.interestid == interest.id })[0];

        if (!searchResult[interest.id]) {
          searchResult[interest.id] = interest;
          searchResult[interest.id].subinterests = [subinterest];
        } else {
          searchResult[interest.id].subinterests.push(subinterest);
        }
      });

    this.searchResult = _.values(searchResult)
      .sort((prev, next) => {
        if (!prev['subinterests'].length && !next['subinterests'].length) {
          return 0;
        }

        if (!prev['subinterests'].length && next['subinterests'].length) {
          return -1;
        }

        if (prev['subinterests'].length && !next['subinterests'].length) {
          return 1;
        }

        return next['subinterests'].length - prev['subinterests'].length
      });
  }

  saveSubinterest(event, interestId) {
    if (!event.target.value) { return false; }

    let indexPosition = 0;
    this.subinterests.forEach((subinterest, index) => {
      indexPosition = interestId == subinterest.interestid ? index : indexPosition;
    });

    this.subinterests[indexPosition].last_in_group = false;

    let interest = this.interests.filter(interest => {
      return interest.id == interestId;
    })[0];

    let newSubinterest = {
      id: 0,
      interest_value: interest.value,
      interestid: interest.id,
      isselected: false,
      last_in_group: true,
      parent_title: interest.value,
      value: event.target.value,
      isdisabled: this.getSelectedSubinterestsCountInGroup(this.subinterests[indexPosition]) >= this.maxSelectedSubInterestsCount,
      parentisselected: true
    }

    this.subinterests.splice(indexPosition + 1, 0, newSubinterest);

    event.target.value = '';
  }

  getSelectedSubinterestsCountInGroup(subinterest) {
    let subinterestsCount = {};
    this.selectedInterests.forEach(interest => {
      subinterestsCount[interest.id] = this.subinterests.filter(subinterest => {
        return subinterest.isselected && interest.id == subinterest.interestid;
      }
      ).length;
    }
    );
    return subinterestsCount[subinterest.interestid];
  }
}
