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
  public baseURI = 'community';
  public baseURIPlural = 'community';

	/**Create community post*/

  public promiseCreateStudentCommunityPosts (communityPost: CommunityModel): Promise<CommunityModel> {
    return this.promisePostModelData(``, communityPost)
    .then((response: IResponse) => {
        return CommunityFactory.createCommunityPost(response.data);
      });
  }

	/** Get student community posts*/
	public promiseGetAllCommunityPostsData (): Promise<CommunityPostModel[]> {
		return this.promiseGetResponseData(`list`)
		.then((response: IResponse) => {
			return CommunityFactory.createCommunityFeed(response.data);
		});
  }

  public promiseGetAllPrivateCommunityData (): Promise<PrivateCommunityModel[]> {
		return this.promiseGetResponseData(`list`)
		.then((response: IResponse) => {
			return CommunityFactory.createPrivateCommunityFeed(response.data);
		});
	}

	 public promiseCreatePrivateCommunity (privateCommunity: PrivateCommunityModel): Promise<PrivateCommunityModel> {
		 return this.promisePostModelData(``, privateCommunity)
		 .then((response: IResponse) => {
			 return CommunityFactory.createPrivateCommunity(response);
		 });
	 }

	/**Get question details */
	public promiseGetQuestionDetail (questionId: Number): Promise<CommunityPostModel> {
		return this.promiseGetResponseData(`${questionId}`)
		.then((response: IResponse) => {
			return CommunityFactory.createCommunityQuestionDetails(response.data);
		});
	}
}
