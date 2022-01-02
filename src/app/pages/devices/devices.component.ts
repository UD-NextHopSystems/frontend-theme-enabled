import { Component } from '@angular/core';
import { Device } from '../../models/device.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeviceService } from '../../services/device.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DeviceDetailsComponent } from '../device-details/device-details.component';
import { NbDialogService, NbSortDirection, NbSortRequest, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowControlButtonsConfig, NbWindowService } from '@nebular/theme';
import { AddDeviceComponent } from './add-device/add-device.component';


interface TreeNode<T>{
  data: T
}



@Component({
  selector: 'ud-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements AfterViewInit {

  devices: Device[];
  displayedColumns: string[] = [ 'Ip', 'Port', 'Area', 'City', 'State', 'Country', 'IsEnabled', 'UseNSO','Edit','Delete'];

  isLinear=true;
  geocodedData;
  dataSource: NbTreeGridDataSource<Device>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  data:TreeNode<Device>[]=[
    // {data: {"_id":"61c8627b984d59bf8503e958","macDetails":{"_id":"61c8627b984d59bf8503e954","macAddress":"ui:43:23:v4","Area":"narasaraopet","City":"narasaraopet","Country":"India","State":"andhra pradesh"},"coordinates":{latitude: 80.052392, longitude: 16.250906},"Ip":"786.123.54.65","IsEnabled":true,"Name":"sai","Password":"sai","Port":"8976","UseNSO":false,"Username":"sai"}},{data: {"_id":"61c9fd6ae50973ebde3ddb2c","macDetails":{"_id":"61c8627b984d59bf8503e954","macAddress":"ui:43:23:v4","Area":"narasaraopet","City":"narasaraopet","Country":"India","State":"andhra pradesh"},"coordinates":{latitude: 80.052392, longitude: 16.250906},"Ip":"786.123.54.65","IsEnabled":true,"Name":"sai","Password":"sai","Port":"8976","UseNSO":false,"Username":"sai"}}
  ];

  customColumn = 'Name';
  // defaultColumns = [ 'size', 'kind', 'items' ];
  defaultColumns = [ 'Ip', 'Port', 'IsEnabled', 'UseNSO' ];
  editColumns = ['Edit']
  deleteColumns = ['Delete']
  idColumn = ['_id']
  macColumns = ['Area', 'City', 'State', 'Country']
  allColumns = [ this.customColumn, ...this.defaultColumns, ...this.macColumns, ...this.editColumns, ...this.deleteColumns ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _matDialog: NbDialogService, private windowService: NbWindowService, private _liveAnnouncer: LiveAnnouncer,
    private toastr:NbToastrService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<Device>,
     private _deviceService: DeviceService) {

   }

   getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

   changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  ngOnInit() {
    this.getDevices()
  }

  ngAfterViewInit() {
    // this.getDevices()

  }

  getDevices(){
    this._deviceService.getAllDevices().subscribe((res:Device[]) => {
      // console.log(res);
      // this.dataSource = new MatTableDataSource(res);
      // this.dataSource.paginator = this.paginator;
      this.geocodedData = res;
      this.data = []

      res.forEach(element => {
        this.data.push({data: element})
      });
      console.log('data',this.data);
      this.dataSource = this.dataSourceBuilder.create(this.data)
    });
    // console.log(this.dataSource);
  }

  addNewDevice() {

   let ref =  this.windowService.open(AddDeviceComponent, {context: {showCloseButton: true, orientation: 'vertical'}, closeOnBackdropClick: false,})

    ref.onClose.subscribe((res)=>{
      console.log(res);
      if(res["status"]){
        this.getDevices();
        this.toastr.success('Device added successfully', 'Success')
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteDeviceById(id){
    let sheetRef = this.windowService.open(DialogContentComponent, {buttons: {fullScreen: false, close: false, maximize: false, minimize: false}, closeOnBackdropClick: false, closeOnEsc: false});
    sheetRef.onClose.subscribe(res => {
      console.log(res);
        if(res['res']==true){
        this._deviceService.deleteDeviceByIP(id).subscribe(res=>{
          console.log(res);
          this.toastr.success('Device Deleted successfully', 'Success')
          this.getDevices()
        })
      }else{
        this.toastr.danger('Something error occured, please try again later', 'Error')

        // this._snackBar.open('Deletion Cancelled', 'Close', {
        //   duration: 600
        // })
      }
    });

  }

  openEditPage(deviceId){
    console.log('editing', deviceId);

    this._deviceService.getDetailsByIp(deviceId).subscribe((dev:Device) =>{
      console.log(dev);
      // dev["edit"] = true;
      const buttonsConfig: NbWindowControlButtonsConfig = {
        minimize: true,
        maximize: true,
        fullScreen: true,
        close: true,
      };

      this._matDialog.open(DeviceDetailsComponent, {context:{'title': 'hello', deviceData: dev}, dialogClass: 'sample'})
      // this.windowService.open(DeviceDetailsComponent,
      //                       {
      //                         context:{'deviceData': dev, isEditing: true, isEnabled: dev.IsEnabled},
      //                         closeOnBackdropClick:false,
      //                         closeOnEsc:false,
      //                         buttons: buttonsConfig
      //                       })
      // let dialogRef = this._matDialog.open(DeviceDetailsComponent,{
      //   hasBackdrop: true,
      //   context: {
      //     data: dev
      //   }
        // disableClose: true,
        // panelClass: "sample",
        // width:"25vw",
        // height:"100vh",
        // position: {
        //   right:'0',
        //   top: '65px'
        // },
        // data: dev,
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   if(result['status']){
      //     // this.getDevices();
      //     console.log(result);

      //     window.location.reload();
      //   }
      // })
    });
  }
}
