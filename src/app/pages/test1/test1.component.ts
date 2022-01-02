import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  constructor(private windowService:NbWindowService) { }

  ngOnInit(): void {
  }

  openWindow() {
    this.windowService.open(TestComponent, { title: `Window` });
  }
}
