import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Coordinates } from '../../../models/coordinates.model';
import { Device } from '../../../models/device.model';
import { DeviceService } from '../../../services/device.service';
import { GeoMapService } from '../../../services/map.service';

@Component({
  selector: 'ud-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  macForm: FormGroup;
  @Input() showCloseButton: Boolean = false;
  @Input() isLinear: Boolean = true;
  @Input() device:Device;
  @Input() orientation;
  showPassword = false;

  constructor(private _formBuilder: FormBuilder, private _mapService: GeoMapService,
    @Optional() public deviceData: Device,
    @Optional() public _dialogRef: NbDialogRef<AddDeviceComponent>, private _deviceService?: DeviceService) {
    }

    ngOnInit(): void {
      console.log(this.device);
      if (!this.device) {
        console.log('in if',this.device);

        this.deviceForm = this._formBuilder.group({
          Name: ['', [Validators.required]],
          Ip: ['', [Validators.required]],
          Port: ['', [Validators.required]],
          Username: ['', [Validators.required]],
          Password: ['', [Validators.required]],
          IsEnabled: [true, [Validators.required]],
          UseNSO: [false, [Validators.required]]
        });
        this.macForm = this._formBuilder.group({
          macAddress: ['', [Validators.required]],
          City: ['', [Validators.required]],
          Area: ['', [Validators.required]],
          State: ['', [Validators.required]],
          Country: ['India', [Validators.required]],
        });
      } else {
        console.log('in else',this.device);

        this.deviceForm = this._formBuilder.group({
          Name: [this.device['Name'], [Validators.required]],
          Ip: [this.device['Ip'], [Validators.required]],
          Port: [this.device['Port'], [Validators.required]],
          Username: [this.device['Username'], [Validators.required]],
          Password: [this.device['Password'], [Validators.required]],
          IsEnabled: [this.device['IsEnabled'], [Validators.required]],
          UseNSO: [this.device['UseNSO'], [Validators.required]]
        });
        this.macForm = this._formBuilder.group({
          macAddress: [this.device['macDetails']['macAddress'], [Validators.required]],
          City: [this.device['macDetails']['City'], [Validators.required]],
          Area: [this.device['macDetails']['Area'], [Validators.required]],
          State: [this.device['macDetails']['State'], [Validators.required]],
          Country: [this.device['macDetails']['Country'], [Validators.required]],
        });

      }
    }

    ngOnChanges(changes){
      console.log(changes);
    }

  onSubmit() {
    console.log(this.deviceForm.value, this.macForm.valid);

    if (this.deviceForm.valid && this.macForm.valid) {
      // this._dialogRef.close({data: this.deviceForm.value, status: true});
      let deviceDetails: Device;
      deviceDetails = this.deviceForm.value;
      deviceDetails.macDetails = this.macForm.value;

      this._mapService.getGeoCodingFromAddress(deviceDetails.macDetails.Area, deviceDetails.macDetails.City, deviceDetails.macDetails.State, deviceDetails.macDetails.City).subscribe(res => {
        console.log(res);

        let coordinates: Coordinates = new Coordinates();
        coordinates.latitude = res["features"][0]["center"][0];
        coordinates.longitude = res["features"][0]["center"][1];
        deviceDetails.coordinates = coordinates;
        this._deviceService.addDevice(deviceDetails).subscribe((res) => {
          console.log(res);
          if (res["status"]) {
            this._dialogRef.close({res: {status: true}});
            // this._dialogRef.close();
          } else {
            console.log("Something error occured, please check");
          }
        });

      });


    } else {
      console.log("errors", this.deviceForm.errors, this.macForm.errors);
      console.log("valid", this.deviceForm.valid, this.macForm.valid);
    }
  }

  onEdit(id) {
    console.log(this.deviceForm.value);
    if (this.deviceForm.valid&&this.macForm.valid) {
      var device:Device;
      device = this.deviceForm.value;
      console.log(this.getDirtyValues([this.deviceForm,this.macForm]));

      this._deviceService.updateDeviceById(id, this.getDirtyValues([this.deviceForm,this.macForm])).subscribe(res => {
        console.log(res);
      });
    }
  }

  getDirtyValues(forms: any[]) {
    let dirtyValues = {};
    forms.forEach(form => {
        Object.keys(form.controls)
            .forEach(key => {
                const currentControl = form.controls[key];
                if (currentControl.dirty) {
                    if (currentControl.controls)
                        dirtyValues[key] = this.getDirtyValues(currentControl);
                    else
                        dirtyValues[key] = currentControl.value;
                }
            });
    });

    return dirtyValues;
}

  onClose() {
    this._dialogRef.close();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
