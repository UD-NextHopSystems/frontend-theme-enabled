import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { NetConfService } from '../../services/netconf.service';

@Component({
  selector: 'ud-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  @Input() title: String;
  isEnabled:Boolean = false;
  isEditing:Boolean = false;
  devConfig='Fetching...';
  // dialogRefs: NbDialogRef<DeviceDetailsComponent>;
  devCapabilities='Fetching...';
  constructor(private dialogRefs: NbDialogRef<DeviceDetailsComponent>,
    @Optional() public deviceData: Device, private _deviceService?: DeviceService, private _netConfService?: NetConfService) {
      //  this.isEnabled = deviceData.IsEnabled
      //  if(deviceData["edit"]){
       if(this.isEditing){
         this.edit()
       }
       this.getConfig()
       this.getCapabilities()
      }

  ngOnInit(): void {
    console.log(this.deviceData);
  }

  closeDialog(){
    this.dialogRefs.close();
  }

  getConfig(){
    this._netConfService.getNetConfConfig().subscribe(res => {
      if(res['config']){
        this.devConfig=res['config']
      }else{
        // this._toastrService.error("Couldn't connect to the server for fetching config", "Net Conf")
      }
      // console.log(res['config']);
    })
  }

  getCapabilities(){
    this._netConfService.getNetConfCapabilities().subscribe(res => {
      // console.log(typeof(res['capabilities']));
      if(res['capabilities']){
        this.devCapabilities=res['capabilities']
      }else{
        // this._toastrService.error("Couldn't connect to the server for fetching capabilities", "Net Conf")
      }
    })
  }

  edit(){
    this.isEditing = !this.isEditing;
    console.log('started editing', this.isEditing);
  }

  changeStatus(id,status){
    console.log(id, status.target.checked);

    this._netConfService.getNetConfRPCStatus(this.deviceData.Ip, status.target.checked).subscribe(res => {
      console.log(res);
    })

    this._deviceService.updateDeviceStatus(id, status.target.checked).subscribe(res => {
      console.log('update status',res);
      if(res['status']){
        console.log('true status');
      }
    })
  }
}
