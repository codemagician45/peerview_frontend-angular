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
	CommunityModel
	CommunityPostModel
} from '../../../shared/models';
import {
	PostEmitter
} from '../../../shared/emitter';
import {
	CommunityApiService
} from '../../../../services/api';

@Component({
	selector: 'community-mobile-ask-question-component',
	templateUrl: './community-mobile-ask-question.html',
	styleUrls: ['./community-mobile-ask-question.scss']
})
export class ComunityMobileAskQuestionMobileComponent {
	constructor (
		@Inject(MAT_DIALOG_DATA) protected user: UserModel,
		private dialog: MatDialog,
		private communityApiService: CommunityApiService,
	) {}

	protected communityPosts: CommunityModel = new CommunityModel();
	protected isToggleUploadComponentVisible: boolean = false;
	private hasImageSelected: boolean = false;

	public ngOnInit (): void {
		this.communityPosts.communityId = 1;
	}

	protected onUploadComplete (attachments): void {
		this.communityPosts.attachments = attachments;
		this.createQuestion();
	}

	private createQuestion (): void {
		console.log(this.communityPosts);
		this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPosts)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
	}

	protected onAskQuestion (): void {
		if (this.hasImageSelected) {
			PostEmitter.uploadImages().emit();
		} else {
			this.createQuestion();
		}
	}

	protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
	}
}
