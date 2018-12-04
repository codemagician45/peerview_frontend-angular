import {
  CommunityPostModel
} from './community';

export class CommunityFactory {
	public static createCommunityPost (data: any): CommunityPostModel {
		return <CommunityPostModel> (new CommunityPostModel())
			.assimilate(data);
	}
}
