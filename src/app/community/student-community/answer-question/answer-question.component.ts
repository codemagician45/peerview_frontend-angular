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
	UserService
} from '../../../../services';
import {
	CommunityPostModel,
	CommunityAnswerQuestionModel
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
			private communityApiService: CommunityApiService,
	) {}

	private communityPost: CommunityPostModel;
	protected user = UserService.getUser();
	protected communityAnswer: CommunityAnswerQuestionModel = new CommunityAnswerQuestionModel();
	protected isUserAnsweringQuestion: Boolean = false;

	public ngOnInit (): void {
		this.route.params.subscribe((params) => {
			this.communityAnswer.courseId = parseInt(CryptoUtilities.decipher(params.courseId), 10);
			this.communityAnswer.questionId = parseInt(CryptoUtilities.decipher(params.id), 10);
			this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
		});
	}

	private getQuestionDetails (courseId, questionId): void {
		this.communityApiService.promiseGetQuestionDetail(courseId, questionId)
		.then((responseData: CommunityPostModel) => {
			this.communityPost = responseData;
		});
	}

	protected onSubmit (formIsValid): void {
		if (formIsValid) {
			this.isUserAnsweringQuestion = true;

			this.communityApiService.promiseCreateAnswerToQuestion(this.communityAnswer)
				.then(() => {
					this.isUserAnsweringQuestion = false;
					this.communityAnswer.comment = '';
					this.getQuestionDetails(this.communityAnswer.courseId, this.communityAnswer.questionId);
				});
			}
	}
}

