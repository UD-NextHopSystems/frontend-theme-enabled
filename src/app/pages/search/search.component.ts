import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchForm } from '../../models/Search.model';
import { FetchdataService } from '../../services/fetchdata.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as IPinfo from "../../models/ipinfo.model";
import { NbToastrService } from '@nebular/theme';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  cpuData:IPinfo.CPUTelemetryData[]=[];
  gcData:IPinfo.GenericCountersTelemetryData[]=[];
  data;
  needTabReload:boolean;
  // worker;
  constructor(private _fetchService:FetchdataService,
    private _formBuilder:FormBuilder, private _toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getAllCPUData();
    this.getAllGCData();
  }

  searchFormData = this._formBuilder.group({
    ipAddress: ['',[Validators.required]],
    port: ['', [Validators.required,Validators.min(1),Validators.max(35555)]],
  });


  onSubmit(ipaddress,portaddress){
    var formData = new SearchForm(ipaddress,portaddress);
    console.log(formData);
    this.gcData=[];
    this.cpuData=[];
    this.data = this.searchFormData.value;
    if(this.data['ipAddress']==''||this.data['port']==''){
      console.log(this.searchFormData.value,'inside if', this.data);
      this.getAllCPUData();
      this.getAllGCData()
    }else{
      console.log('outside of if', this.searchFormData.value['ipAddress'], this.data);

      this.getGCData();
      this.getCPUData();
    }
  }

  getCPUData(){
    this.needTabReload=false;
    this._fetchService.fetchAllCPUInfoFrom(this.data).subscribe((res:[]) => {
      if(res){
        if(res!==this.cpuData)
          {
            this.cpuData=res["data"];
            this._toastrService.success("Data Changed","Loading Data")
          }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
        console.log(this.cpuData);
      }
      else{
        this._toastrService.danger('No Data found', "Un Successfull");
      }
    });
  }

  getGCData(){
    this.needTabReload=false;
    this._fetchService.fetchGCInfoFrom(this.data).subscribe( (res:[]) => {
      if(res){
        if(res!==this.gcData){
          this.gcData=res["data"];
          this._toastrService.success("Data Changed","Loading Data")
        }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
      }
      else{
        this._toastrService.danger('No Data found', "Un Successfull");
      }
    });
  }

  getAllCPUData(){
    this.needTabReload=false;
    this._fetchService.fetchAllCPUInfo().subscribe((res:[]) => {
      if(res){
        if(res!==this.cpuData)
          {
            this.cpuData=res["data"];
            this._toastrService.success("Data Changed","Loading Data")
          }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
        console.log(this.cpuData);
      }
      else{
        this._toastrService.danger('No Data found', "Un Successfull");
      }
    });
  }

  getAllGCData(){
    if(this.data)
    this.needTabReload=false;
    this._fetchService.fetchAllGCInfo().subscribe( (res:[]) => {
      if(res){
        if(res!==this.gcData){
          this.gcData=res["data"];
          this._toastrService.success("Data Changed","Loading Data")
        }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
      }
      else{
        this._toastrService.danger('No Data found', "Un Successfull");
      }
    });
  }

  showNoChange(){
    console.log('hello');

  }
}
