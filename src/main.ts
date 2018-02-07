import {
  enableProdMode
} from '@angular/core';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  AppModule
} from './app/app.module';
import {
  CONFIG
} from './config';

if (CONFIG.environment === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
