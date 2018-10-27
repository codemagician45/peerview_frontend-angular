import {
	CommunityModel,
	CommunityPostModel,
	PrivateCommunityModel
} from './community';

export class CommunityFactory {
	public static createCommunityPost (data: any): CommunityModel {
		return <CommunityModel> (new CommunityModel());
	}

	public static createPrivateCommunity (data: any): PrivateCommunityModel {
		return <PrivateCommunityModel> (new PrivateCommunityModel())
			.assimilate(data);
	}

	public static createCommunityFeed (data: any): CommunityPostModel {
		return <CommunityPostModel> (new CommunityPostModel())
			.assimilate(data);
	}
}
