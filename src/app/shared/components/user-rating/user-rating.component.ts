	/**
	 * This component would be used to get and display user-ratings
	**/
import {
	Component,
	OnInit,
	Input
} from '@angular/core';
import {
	UserModel
} from '../../models';
import {
	UserApiService
} from '../../../../services/api';

@Component({
	selector: 'shared-user-rating',
	templateUrl: './user-rating.component.html',
	styleUrls: ['./user-rating.component.scss']
})
export class SharedUserRatingComponent implements OnInit {
	constructor (private userApiService: UserApiService) {}
  @Input() protected user: UserModel;
	protected userCreditsRatingPercentage: string = '20%';

	public ngOnInit (): void {
		this.userApiService.promiseGetUserCredits(this.user)
		.then((response => {
			let totalCredits = response.data.totalCredits;
			switch (true) {
				case (totalCredits < 500) :
					this.userCreditsRatingPercentage = '20%';
				break;
				case (totalCredits >= 500 && totalCredits <= 1199) :
					this.userCreditsRatingPercentage = '40%';
				break;
				case (totalCredits >= 1200 && totalCredits <= 1999) :
					this.userCreditsRatingPercentage = '50%';
				break;
				case (totalCredits >= 2000 && totalCredits <= 2999) :
					this.userCreditsRatingPercentage = '60%';
				break;
				case (totalCredits >= 3000 && totalCredits <= 3999) :
					this.userCreditsRatingPercentage = '70%';
				break;
				case (totalCredits >= 4000 && totalCredits <= 5999) :
					this.userCreditsRatingPercentage = '80%';
				break;
				case (totalCredits >= 6000 && totalCredits <= 7999) :
					this.userCreditsRatingPercentage = '90%';
				break;
				case (totalCredits >= 8000) :
					this.userCreditsRatingPercentage = '100%';
				break;
			}
		}))
		.catch(error => {
			console.log(error);
		});
	}
}
