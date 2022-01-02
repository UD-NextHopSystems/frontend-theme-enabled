import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  apiUrl= environment.apiBaseUrl;
  constructor(private _http:HttpClient) { }
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  getAllDevices(){
    return this._http.get(this.apiUrl+"/device/all");
  }

  addDevice(device:Device){
    // return this._http.post(this.apiUrl+'/devices/add',  device);
    return this._http.post(this.apiUrl+'/device',  device);
  }

  getDetailsById(_id){
    return this._http.get(this.apiUrl+'/device/'+_id);
  }

  getDetailsByIp(ip){
    return this._http.get(this.apiUrl+'/device/ip/'+ip);
  }

  updateDeviceById(id: any, device:any){
    return this._http.put(this.apiUrl+'/device/update/'+id, device)
  }

  deleteDeviceById(deviceId){
    return this._http.delete(this.apiUrl+'/device/'+deviceId)
  }

  deleteDeviceByIP(deviceIp){
    return this._http.delete(this.apiUrl+'/device/ip/'+deviceIp)
  }

  updateDeviceStatus(deviceId,status){
    return this._http.post(this.apiUrl+'/device/modifystatus/'+deviceId, {isEnabled: status})
  }
}
