import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Response
} from '../app/shared/models';
interface IGetUrlPromise {
  [url: string]: Promise<any>;
}

@Injectable()
export abstract class ApiService {
  constructor (
    private http: HttpClient
  ) {
    console.log('CAMPUS SERVICES');
    this.init();
  }

  protected abstract options: any;
  private getUrlPromises: IGetUrlPromise = {};


  protected init (): void {}

  protected promiseGetResponseData (url?: string, refresh = false): Promise<Response> {
    url = url || '';

    if (!refresh && this.getUrlPromises[url]) {
      return this.getUrlPromises[url];
    }

    this.getUrlPromises[url] = new Promise((resolve, reject) => {
      this.http.get(url, this.options)
        .subscribe((response: any) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });

    return this.getUrlPromises[url];
  }
}
