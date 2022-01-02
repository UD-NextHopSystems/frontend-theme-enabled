import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbIconLibraries } from '@nebular/theme';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  selectedTheme = '';
  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'clipboard-outline',
      link: '/pages/dashboard',
    },
    {
      title: 'Search',
      link: '/pages/search',
      icon: 'search',
    },
    {
      title: 'Devices',
      icon: 'smartphone-outline',
      link: '/pages/device',
    },
  ];

  constructor(private sidebarService: NbSidebarService, private nbThemeService: NbThemeService, private iconLibraries: NbIconLibraries) {

    this.iconLibraries.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fas', {packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fad', { packClass: 'fad', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fal', { packClass: 'fal', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('fax', { packClass: 'fa-light', iconClassPrefix: 'fa' });

    this.nbThemeService.onThemeChange().subscribe(res => {
      console.log(res['name']);
    })
  }

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('theme')
    this.changeTheme(this.selectedTheme)

  }

  toggle() {
    this.sidebarService.toggle(true, 'left');
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'right');
  }

  changeTheme(event: any) {
    // console.log(event);
    this.nbThemeService.changeTheme(event);
    localStorage.setItem('theme', event)

  }

}
