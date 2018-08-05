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
  PostModel,
  PostPollModel,
  PostReplyModel,
  ReportPostModel,
  SharePostModel,
  IResponse,
} from '../../app/shared/models';
import {
  PostFactory
} from '../../app/shared/models/factory';

@Injectable()
export class PostApiService extends ApiService {
  public options = {};
  public baseURI = 'post';
  public baseURIPlural = 'posts';

  public promiseGetAllPost (limit: number, offset: number): Promise<PostModel[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

      this.options = {
        params: params
      };

    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return PostFactory.createManyPost(response.data);
      });
  }

  public promiseGetPost (postId: number): Promise<PostModel> {
    return this.promiseGetResponseData(`${postId}`)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePost (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePostPoll (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('poll', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseCreatePostReply (postId: number, postReply: PostReplyModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/reply`, postReply)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseCreatePostLike (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promisePageView (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseReportPost (postId: number, reportPost: ReportPostModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/report`, reportPost)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseSharePost (postId: number, sharePost: SharePostModel): Promise<PostModel> {
    return this.promisePostModelData(`share/${postId}`, sharePost)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promisePostTo (post: PostModel): Promise<PostModel> {
    return this.promisePostModelData('', post)
      .then((response: IResponse) => {
        return PostFactory.createPost(response.data);
      });
  }

  public promiseRemovePostLike (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}/like`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseRemovePost (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }

  public promiseVotePoll (postPollOptionId: number): Promise<IResponse> {
    return this.promisePostModelData(`post/poll/${postPollOptionId}`)
      .then((responseData: IResponse) => {
        return responseData;
      });
  }
}
