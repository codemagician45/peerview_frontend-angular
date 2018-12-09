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
  PrivateCommunityModel,
  CommunityAnswerQuestionModel,
  IResponse
} from '../../app/shared/models';
import {
  CommunityFactory
} from '../../app/shared/models/factory';

@Injectable()
export class CommunityApiService extends ApiService {
  public options = {};
  public baseURI = 'post/v2/community';
  public baseURIPlural = 'post/v2/community';


  public static createPrivateCommunity (data: any): PrivateCommunityModel {
		return <PrivateCommunityModel> (new PrivateCommunityModel())
			.assimilate(data);
  }

  public static createPrivateCommunityFeed (data: any): Array<PrivateCommunityModel> {
		return data.map(
			instanceData => CommunityFactory.createFeed(instanceData)
		);
  }
  
	/**
	*  Get all community
	*/

  public promiseCreateStudentCommunityPosts (communityPost: CommunityPostModel): Promise<CommunityPostModel> {
    return this.promisePostModelData(`course/${communityPost.courseId}`, communityPost)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityPost(response.data);
      });
  }

  /**Get question details */
  public promiseGetQuestionDetail (courseId: Number, questionId: Number): Promise<CommunityPostModel> {
    return this.promiseGetResponseData(`course/${courseId}/${questionId}`)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityQuestionDetails(response.data);
      });
  }

  /**Answer question */
  public promiseCreateAnswerToQuestion (answer: CommunityAnswerQuestionModel): Promise<CommunityAnswerQuestionModel> {
    return this.promisePostModelData(`${answer.questionId}/reply`, answer)
      .then((response: IResponse) => {
        return CommunityFactory.createCommunityAnswerToQuestion(response.data);
      });
  }

  public promiseCreatePrivateCommunity (privateCommunity: PrivateCommunityModel): Promise<PrivateCommunityModel> {
    return this.promisePostModelData(``, privateCommunity)
      .then((response: IResponse) => {
        return CommunityFactory.createPrivateCommunity(response.data);
      });
  }

  /** Get student community posts*/
  public promiseGetAllCommunityPostsData (courseId: number): Promise<CommunityPostModel[]> {
    return this.promiseGetAllResponseData(`course/${courseId}/list`)
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
}
