import {
    Pipe,
    PipeTransform
  } from '@angular/core';
  import {
    DatePipe
  } from '@angular/common';
import { PostApiService } from '../../../services/api';
import { NgxLinkifyjsService, Link } from 'ngx-linkifyjs';

  @Pipe({
    name: 'linkPreview',
    pure: false
  })
  export class SharedLinkPreviewPipeComponent implements PipeTransform {
    constructor (
        private postApiService: PostApiService,
        public linkifyService: NgxLinkifyjsService,
    ) {}

    public async transform (postMessage: string): Promise<any> {

        let findUrl: Link[] = await this.linkifyService.find(postMessage);

        if (findUrl.length > 0 && findUrl[0].type === 'url') {
          let regex = new RegExp((findUrl[0].value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          return this.postApiService.promiseGetJsonForLinkPreview(encodeURIComponent(findUrl[0].href))
            .then((res: any) => {
              return `${(postMessage.replace(regex, ' ')).trim()}
                <div class="link-preview">
                  <div class="link-area">
                  <div class="og-image">
                    <a href="${res.data.url}" target="_blank">
                      <img src="${res.data.image}" alt="logo" />
                    </a>
                  </div>
                  <div class="descriptions">
                    <div class="og-title">${res.data.title}</div>
                    <div class="og-description">${res.data.description}</div>
                    <div class="og-url"><a href="${res.data.url}" target="_blank"> ${res.data.url} </a> </div>
                  </div>
                  </div>
                </div>`;
            });
        }
    }
}
