import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbWindowConfig, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() title: String;
  constructor(protected ref: NbWindowRef<TestComponent>) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }

}
