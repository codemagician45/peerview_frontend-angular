import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  IResponse
} from '../app/shared/models';
import {
  Model
} from '../app/shared/models/model';

interface IGetUrlPromise {
  [url: string]: Promise<any>;
}

@Injectable()
export abstract class ApiService {
  constructor (
    private http: HttpClient
  ) {}

  public abstract baseURI: string;
  public abstract baseURIPlural: string;
  public abstract options: any;
  private cloneURIs: {baseURI: string, baseURIPlural: string};

  private getUrlPromises: IGetUrlPromise = {};

  private cloneAbstractURIs (): void {
    this.cloneURIs = Object.assign({}, {
      baseURI: this.baseURI,
      baseURIPlural: this.baseURIPlural
    });
  }

  private resetAbstractURIs (): void {
    this.baseURI = this.cloneURIs.baseURI;
    this.baseURIPlural = this.cloneURIs.baseURIPlural;
  }

  protected promiseGetResponseData (url?: string, refresh = false): Promise<IResponse> {
    this.cloneAbstractURIs();
    url = url ? `/${url}` : '';
    url = `${this.baseURI}${url}`;

    if (!refresh && this.getUrlPromises[url]) {
      return this.getUrlPromises[url];
    }

    this.getUrlPromises[url] = new Promise((resolve, reject) => {
      this.http.get(url, this.options)
        .subscribe((response: any) => {
          resolve(response);
          this.resetAbstractURIs();
        }, (error) => {
          reject(error);
          this.resetAbstractURIs();
        });
    });

    return this.getUrlPromises[url];
  }

  protected promiseGetAllResponseData (url?: string, refresh = false): Promise<IResponse> {
    this.cloneAbstractURIs();
    url = url ? `/${url}` : '';
    url = `${this.baseURIPlural}${url}`;

    if (!refresh && this.getUrlPromises[url]) {
      return this.getUrlPromises[url];
    }

    this.getUrlPromises[url] = new Promise((resolve, reject) => {
      this.http.get(url, this.options)
        .subscribe((response: any) => {
          resolve(response);
          this.resetAbstractURIs();
        }, (error) => {
          reject(error);
          this.resetAbstractURIs();
        });
    });

    return this.getUrlPromises[url];
  }

  protected promisePostModelData (url: string, dataModel?: Model): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.cloneAbstractURIs();
      url = url ? `/${url}` : '';
      url = `${this.baseURI}${url}`;

      this.http.post(url, dataModel.toRawData())
        .subscribe((response: any) => {
          resolve(response);
          this.resetAbstractURIs();
        }, (error) => {
          reject(error);
          this.resetAbstractURIs();
        });
    });
  }

  protected promisePutModelData (url: string, dataModel?: Model): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.cloneAbstractURIs();
      url = url ? `/${url}` : '';
      url = `${this.baseURI}${url}`;

      this.http.put(url, dataModel.toRawData())
        .subscribe((response: any) => {
          resolve(response);
          this.resetAbstractURIs();
        }, (error) => {
          reject(error);
          this.resetAbstractURIs();
        });
    });
  }

  protected promiseRemoveData (url: string): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      this.cloneAbstractURIs();
      url = url ? `/${url}` : '';
      url = `${this.baseURI}${url}`;

      this.http.delete(url, this.options)
        .subscribe((response: any) => {
          resolve(response);
          this.resetAbstractURIs();
        }, (error) => {
          reject(error);
          this.resetAbstractURIs();
        });
    });
  }
}
