import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { DeviceDetailsComponent } from '../device-details/device-details.component';
import { Device } from '../../models/device.model';
import { MacDetail } from '../../models/macdetails.model';
import { DeviceService } from '../../services/device.service';
import { MacdetailsService } from '../../services/macdetails.service';
import { GeoMapService } from '../../services/map.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {

  @Input() markersInfo:Device[]=[];

  constructor(private _dialogService:NbDialogService, private map: GeoMapService, private deviceService: DeviceService, private _matDialog?: MatDialog) {
  }

  ngOnInit() {
    // this.map.buildMap();
    // console.log('ngoninit',this.markersInfo);
  }

  ngAfterViewInit(): void {
    this.map.buildMap();
    var centerLat=0,centerLong=0;
    setTimeout(() => {
      if(this.markersInfo!=undefined && this.markersInfo.length!=0){

        this.markersInfo.forEach((element:Device) => {
          centerLat+=element.coordinates["geoLocation"][0]; centerLong+=element.coordinates["geoLocation"][1];
          let marker = new mapboxgl.Marker().setLngLat([element.coordinates["geoLocation"][0],element.coordinates["geoLocation"][1]])
          .setPopup(new mapboxgl.Popup({offset: 20}));
          marker.getElement().addEventListener('click', () => {
            this.getSettings(element);
          });
          marker.addTo(this.map.getMap())
      });
      this.map.setCenterLatLong(centerLat/this.markersInfo.length,centerLong/this.markersInfo.length);
        }
    }, 5000);
  }
  getSettings(markerDetails:Device){
    let config = new MatDialogConfig();
    console.log('logging marker details'+markerDetails._id);
    this.deviceService.getDetailsById(markerDetails._id).subscribe((dev:Device) =>{
      let dialogRef = this._dialogService.open(DeviceDetailsComponent,{
        hasBackdrop: true,
        closeOnEsc: false,
        dialogClass: 'sample',
        hasScroll: true,
        closeOnBackdropClick: false,
        // disableClose: true,
        // panelClass: "sample",
        // width:"25vw",
        // height:"100vh",
        // position: {7
        //   right:'0',
        //   top: '-30px'
        // },
        context: {
          deviceData: dev
        }
      })
    })
  }

}
