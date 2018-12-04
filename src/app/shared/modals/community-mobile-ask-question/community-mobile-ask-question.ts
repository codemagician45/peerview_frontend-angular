import {
	Component,
	Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';

@Component({
	selector: 'community-mobile-ask-question-component',
	templateUrl: './community-mobile-ask-question.html',
	styleUrls: ['./community-mobile-ask-question.scss']
})
export class ComunityMobileAskQuestionMobileComponent {
	constructor (
		@Inject(MAT_DIALOG_DATA) protected confirmActionData: any,
    private dialog: MatDialog
	) {}
}
