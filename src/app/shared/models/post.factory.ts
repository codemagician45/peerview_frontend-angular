import {
  PostModel
} from './post';

export class PostFactory {
  public static createPost (data: any): PostModel {
    return <PostModel> (new PostModel ())
      .assimilate(data);
  }

  public static createManyPost (data: Array<PostModel>): Array<PostModel> {
    return data.map(
      instanceData => PostFactory.createPost(instanceData),
    );
  }
}
