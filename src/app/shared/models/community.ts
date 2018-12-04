import {
	Model,
} from './model';
import {
	PostReplyModel
} from './post';
import {
	UserModel
} from './user';

export class CommunityModel extends Model {
	public communityId: number;
	public courseId: number;
	public message: string;
	public area: string;
	public type: string;
	public question: string;
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
  public message: string = 'This is a private community.';
  public area: string = 'community';
  public type: string = 'post';

	public init (): void {}
}

export class CommunityPostModel extends Model {
	public id?: number;
	public createdAt: Date;
	public message: string;
	public likeCount: number;
	public isUserLike: number;
	public isUserPostLike: number;
	public pageviewCount: number;
	public campusPostReply: Array<PostReplyModel>;
	public postShare: CommunityPostModel;
	public postReply: Array<PostReplyModel>;
	public ratingCount: number;
	public roundedRating?: number;
	public attachments: String[];
	public user: UserModel;

	// use as a virtual holder for postPoll

	public init (): void {
	  this.setBlankDataStructure({
		id: undefined,
		message: undefined,
		attachments: []
	  });
	}
}
