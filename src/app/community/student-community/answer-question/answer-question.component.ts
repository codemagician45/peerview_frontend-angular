import {
  Component
} from '@angular/core';
import {
	ActivatedRoute,
	Router,
	Params
} from '@angular/router';
import {
	CommunityApiService
} from '../../../../services/api';
import {
	CommunityPostModel
} from '../../../shared/models';
import {
	CryptoUtilities
} from '../../../shared/utilities';

@Component({
	selector: 'answer-question-component',
	templateUrl: './answer-question.component.html',
	styleUrls: ['./answer-question.component.scss']
})
export class  AnswerQuestionCommunityComponent {
	constructor (
			private route: ActivatedRoute,
			private router: Router,
			private communityApiService: CommunityApiService
	) {}

	public ngOnInit (): void {
		this.route.params.subscribe((params) => {
			let questionId = parseInt(CryptoUtilities.decipher(params.id), 10);
			this.getQuestionDetails(questionId);
		});
	}

	private getQuestionDetails (questionId): void {
		this.communityApiService.promiseGetQuestionDetail(questionId)
		.then((responseData: CommunityPostModel) => {
			console.log(responseData);
		});
	}
}

