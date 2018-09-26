import {
	Component
} from '@angular/core';
import {
	CourseModel,
	UserModel
} from '../../shared/models';
import {
	CourseApiService
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
	constructor (private courseApiService: CourseApiService) {}

	private courses = [];
	private user: UserModel;

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
}
