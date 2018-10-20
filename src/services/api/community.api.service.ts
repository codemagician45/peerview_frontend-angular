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

	/**
	*  Get all community
	*/

	 public promiseCreateStudentCommunityPosts (communityPost: CommunityPostModel): Promise<CommunityPostModel> {
		 return this.promisePostModelData(`community/post`, communityPost)
		 	.then((response: IResponse) => {
				 return CommunityFactory.createCommunityPost(response.data);
			 });
	 }
}
