import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeModule, NbDialogModule, NbWindowModule, NbStepperModule, NbToastrModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    NbEvaIconsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NbStepperModule,
    NgHttpLoaderModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    NbDialogModule.forRoot({closeOnEsc: false, closeOnBackdropClick: false}),
    NbWindowModule.forRoot({closeOnEsc: false, windowClass: 'sample', closeOnBackdropClick: false}),
    NbToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
