import {
	Component
} from '@angular/core';
import {
	CourseModel,
	UserModel,
	CommunityPostModel
} from '../../shared/models';
import {
	CourseApiService,
	CommunityApiService
} from '../../../services/api';
import {
	UserService
} from '../../../services';

@Component({
	selector: 'student-community-component',
	templateUrl: './student-community.component.html',
	styleUrls: ['./student-community.component.scss']
})
export class StudentCommunityComponent {
	constructor (
		private courseApiService: CourseApiService,
		private communityApiService: CommunityApiService) {}

	private courses = [];
	private user: UserModel;
	protected communityPosts: CommunityPostModel = new CommunityPostModel();

	public ngOnInit (): void {
		this.getCourse();
		this.user = UserService.getUser();
	}

	private getCourse (): void {
		this.courseApiService.promiseGetAllCourses()
		.then((courses: CourseModel[]) => {
			this.courses = courses;
		})
		.catch(() => {});
	}

	protected onAskQuestion (): void {
		console.log(this.communityPosts);
		this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPosts)
		.then(() => {})
		.catch((error) => {
			console.log(error);
		});
	}

	protected onChangeCourse (item): void {
		this.communityPosts.courseId = item;
		console.log(item);
	}
}
