import {
	Model
} from './model';

export class CommunityPostModel extends Model {
	public courseId: number;
	public message: string;
	public attachments: String[];
	public init (): void {}
}
