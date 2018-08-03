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

  public promiseCreatePostReply (postId: number, postReply: PostReplyModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/reply`, postReply)
      .then((response: IResponse) => {
        console.log(response);
        return response.data;
      });
  }

  public promiseCreatePostLike (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/like`)
      .then((response: IResponse) => {
        console.log(response);
        return response.data;
      });
  }

  public promisePageView (postId: number): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/like`)
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseReportPost (postId: number, reportPost: ReportPostModel): Promise<IResponse> {
    return this.promisePostModelData(`${postId}/report`, reportPost)
      .then((response: IResponse) => {
        return response.data;
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
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseRemovePost (postId: number): Promise<IResponse> {
    return this.promiseRemoveData(`${postId}`)
      .then((response: IResponse) => {
        return response.data;
      });
  }

  public promiseVotePoll (postPollOptionId: number): Promise<IResponse> {
    return this.promiseVotePollData(`post/poll/${postPollOptionId}`)
      .then((response: IResponse) => {
        return response.data;
      });
  }
}
