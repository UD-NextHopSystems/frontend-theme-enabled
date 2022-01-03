import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NbSidebarModule,NbButtonModule,NbLayoutModule, NbThemeModule, NbMenuModule, NbIconModule, NbSelectModule, NbTreeGridModule, NbActionsModule, NbDialogModule, NbInputModule, NbCardModule, NbToggleModule, NbStepperModule, NbFormFieldModule, NbTabsetModule, NbAccordionModule, NbWindowModule, NbToastrModule, NbSearchModule, NbUserModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { SearchComponent } from './search/search.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { MapComponent } from './map/map.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { TestComponent } from './test/test.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { Test1Component } from './test1/test1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PagesComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    SearchComponent,
    DialogContentComponent,
    MapComponent,
    AddDeviceComponent,
    TestComponent,
    Test1Component,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NbThemeModule.forRoot(),
    PagesRoutingModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    // MaterialModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
    ToastrModule.forRoot(),
    // MatSlideToggleModule,
    // MatStepperModule,
    NbTreeGridModule,
    NbActionsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbInputModule,
    NbCardModule,
    ChartsModule,
    NbToggleModule,
    NbStepperModule,
    NbFormFieldModule,
    NgProgressModule,
    NgProgressHttpModule,
    NbTabsetModule,
    NbAccordionModule,
    NbToastrModule.forRoot(),
    NbSearchModule,
    NbUserModule
  ]
})
export class PagesModule { }
