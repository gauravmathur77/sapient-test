import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, POSITION, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { CLOUDINARY_CONFIG, NgxPictureModule } from 'ngx-picture';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsOpacity: 0.5,
  fgsColor: '#00ACC1',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 75,
  fgsType: SPINNER.threeStrings,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  text: 'Loading...',
  textColor: '#00000',
  textPosition: POSITION.centerCenter,
  blur: 5
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      exclude: [],
      showForeground: true
    }),
     NgxPictureModule.forRoot(CLOUDINARY_CONFIG),
     ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
