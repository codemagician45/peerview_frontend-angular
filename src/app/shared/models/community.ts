import {
	Model
} from './model';

export class CommunityPostModel extends Model {
	public courseId: number;
	public message: string;
	public attachments: String[];

	public init (): void {
		this.setBlankDataStructure({
			id: undefined,
			attachments: []
		});
	}
}

export class PrivateCommunityModel extends Model {
	public communityName: string;
	public institutionName: string;
	public users: String[];

	public init (): void {}
}
