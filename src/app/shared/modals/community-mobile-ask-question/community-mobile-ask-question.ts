import {
	Component,
	Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
	UserModel,
	CommunityPostModel
} from '../../../shared/models';
import {
	PostEmitter
} from '../../../shared/emitter';

@Component({
	selector: 'community-mobile-ask-question-component',
	templateUrl: './community-mobile-ask-question.html',
	styleUrls: ['./community-mobile-ask-question.scss']
})
export class ComunityMobileAskQuestionMobileComponent {
	constructor (
		@Inject(MAT_DIALOG_DATA) protected user: UserModel,
    private dialog: MatDialog
	) {}

	protected communityPosts: CommunityPostModel = new CommunityPostModel();

	public ngOnInit (): void {
		console.log(this.user);
	}
}
