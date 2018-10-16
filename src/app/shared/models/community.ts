import {
	Model
} from './model';

export class CommunityPostModel extends Model {
	public courseId: number;
	public question: string;
	public attachments: String[];
	public init (): void {}
}
