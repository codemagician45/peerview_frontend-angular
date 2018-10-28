import {
	Injectable
} from '@angular/core';
import {
	HttpParams
} from '@angular/common/http';
import {
	ApiService
} from '../api.service';
import {
	PrivateCommunityModel,
	CommunityModel,
	CommunityPostModel,
	IResponse
} from '../../app/shared/models';
import {
	CommunityFactory
} from '../../app/shared/models/factory';

@Injectable()
export class CommunityApiService extends ApiService {
  public options = {};
  public baseURI = '';
  public baseURIPlural = '';

	/**Create community post*/

	 public promiseCreateStudentCommunityPosts (communityPost: CommunityModel): Promise<CommunityModel> {
		 return this.promisePostModelData(`post/v2`, communityPost)
		 	.then((response: IResponse) => {
				 return CommunityFactory.createCommunityPost(response.data);
			 });
	 }

	/** Get student community posts*/
	public promiseGetAllCommunityPostsData (courseId: number): Promise<CommunityPostModel> {
		return this.promiseGetAllResponseData(`community/posts?courseId=${courseId}`)
		.then((response: IResponse) => {
			return CommunityFactory.createCommunityFeed(response.data);
		});
	}

	 public promiseCreatePrivateCommunity (privateCommunity: PrivateCommunityModel): Promise<PrivateCommunityModel> {
		 return this.promisePostModelData(``, privateCommunity)
		 .then((response: IResponse) => {
			 return CommunityFactory.createPrivateCommunity(response.data);
		 });
	 }
}
