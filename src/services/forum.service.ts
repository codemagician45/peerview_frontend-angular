import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  Forum
} from '../models/models';

@Injectable()
export class ForumService {
  constructor (private http: HttpClient) {}

  public parseForum (unparsedquestions: any): Forum[] {
    const allforums: Forum[] = [];
    unparsedquestions.forEach(element => {
      const forum = new Forum();
      forum.authorid = element['author_id'];
      forum.question = element['question'];
      forum.author = `${element['first_name']} ${element['last_name']}`;
      forum.shares = element['share_count'];
      forum.views = element['view_count'];
      forum.createdat = element['created_at'];
      allforums.push(forum);
    });

    return allforums;
  }

  public getPopularQuestions (): Observable<Object>  {
    return this.http.get('forum/popular');
  }
}
