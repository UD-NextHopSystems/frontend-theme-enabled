import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { DevicesComponent } from './devices/devices.component';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { Test1Component } from './test1/test1.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'device',
        component: DevicesComponent,
      },
      {path: 'device/add', component: AddDeviceComponent},
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'test',
        component: Test1Component
      },
      {
        path: 'globalsearch',
        component: Test1Component
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
