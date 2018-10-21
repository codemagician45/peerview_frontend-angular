import {
	CommunityPostModel,
	PrivateCommunityModel
} from './community';

export class CommunityFactory {
	public static createCommunityPost (data: any): CommunityPostModel {
		return <CommunityPostModel> (new CommunityPostModel())
			.assimilate(data);
	}

	public static createPrivateCommunity (data: any): PrivateCommunityModel {
		return <PrivateCommunityModel> (new PrivateCommunityModel())
			.assimilate(data);
	}
}
