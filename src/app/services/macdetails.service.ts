import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MacDetail } from '../models/macdetails.model';

@Injectable({
  providedIn: 'root'
})
export class MacdetailsService {
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

  getAllMacDetails(){
    return this._http.get(this.apiUrl+"/fetch/macdetails/all");
  }

  addMacDetail(device:MacDetail){
    return this._http.post(this.apiUrl+'/macdetails/add',  device);
  }

  getDetailsById(_id){
    return this._http.get(this.apiUrl+'/fetch/macdetails/'+_id);
  }
}
