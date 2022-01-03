import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ud-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  constructor(private _bottomSheetRef: NbWindowRef<DialogContentComponent>) { }

  ngOnInit(): void {
  }

  sendResponse(response){
    this._bottomSheetRef.close({res: response})
    // this._bottomSheetRef.dismiss(response)
  }

}
