import {
	Component
} from '@angular/core';
import {
	CourseModel,
	UserModel,
	CommunityModel,
	CommunityPostModel
} from '../../../shared/models';
import {
	ActivatedRoute,
	Router,
	Params
} from '@angular/router';
import {
	CourseApiService,
	CommunityApiService
} from '../../../../services/api';
import {
	UserService
} from '../../../../services';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
	ComunityMobileAskQuestionMobileComponent
} from '../../../shared/modals';
import {
	PostEmitter
} from '../../../shared/emitter';
import {
	CryptoUtilities
} from '../../../shared/utilities';

@Component({
	selector: 'student-community-component',
	templateUrl: './student-community.component.html',
	styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent {
	constructor (
		private route: ActivatedRoute,
		private router: Router,
		private courseApiService: CourseApiService,
		private communityApiService: CommunityApiService,
		private dialog: MatDialog,
		private overlay: Overlay) {}

	private hasImageSelected: boolean = false;
	private courses = [];
	private user: UserModel;
	protected communityPost: CommunityModel = new CommunityModel();
	protected communityPosts: CommunityPostModel[] = [];
	protected isToggleUploadComponentVisible: boolean = false;
	protected sampleReplyString: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

	public ngOnInit (): void {
		this.getCourse();
		this.getStudentCommunityFeed();
		this.user = UserService.getUser();
	}

	private getStudentCommunityFeed (): void {
		this.communityApiService.promiseGetAllCommunityPostsData()
		.then((responseData: CommunityPostModel[]) => {
			this.communityPosts = responseData;
			console.log(this.communityPosts);
		})
		.catch(error => {
			console.log(error);
		});
	}

	private getCourse (): void {
		this.courseApiService.promiseGetAllCourses()
		.then((courses: CourseModel[]) => {
			this.courses = courses;
		})
		.catch(() => {});
	}

	protected onAskQuestion (): void {
		if (this.hasImageSelected) {
			PostEmitter.uploadImages().emit();
		} else {
			this.createQuestion();
		}
	}

	protected onChangeCourse (item): void {
		this.communityPost.courseId = item;
	}

	protected onOpenAskQuestionModal (): void {
    let dialogConfig = new MatDialogConfig();
		dialogConfig.panelClass = 'ask-a-question-modal';
		dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
		dialogConfig.data = this.user;
		this.dialog.open(ComunityMobileAskQuestionMobileComponent, dialogConfig);
	}

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
	}

	protected onUploadComplete (attachments): void {
		this.communityPost.attachments = attachments;
		this.createQuestion();
	}

	private createQuestion (): void {
		this.communityPost.area = 'community';
		this.communityPost.type = 'post';
		this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPost)
		.then(() => {
			this.communityPost.init();
			this.getStudentCommunityFeed();
		})
		.catch((error) => {
			console.log(error);
		});
	}

	protected onAnswerQuestion (id): void {
		const encryptedItemId = CryptoUtilities.cipher(id);
		this.router.navigate([`../${encryptedItemId}`], {relativeTo: this.route});
	}
}
