import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxFileDropModule } from 'ngx-file-drop';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "223971077227-mfpp3qa0tlfs2mctcfhum5h4tbtv7aul.apps.googleusercontent.com",
  discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
  scope: [
      "https://www.googleapis.com/auth/drive"
  ].join(" ")
};

const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    AppRoutingModule,
    NgxFileDropModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
