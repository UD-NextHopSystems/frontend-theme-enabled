import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartScales, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { FetchdataService } from '../../services/fetchdata.service';
import * as _ from 'lodash';
import * as IPinfo from '../../models/ipinfo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true
  };

  Details : IPinfo.CPUTelemetryData[] = [];

  charts=[];

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartTicksConfig: ChartScales = {

  }
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
    backgroundColor: [
      'red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)',
    ],
    // borderColor: [
    //   'rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)'
    // ]
 }];

   constructor(private _fetchService: FetchdataService) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }

  ngOnInit(): void {
    this._fetchService.fetchAllCPUInfo().subscribe((res:IPinfo.CPUTelemetryData[]) => {
      console.log(res);
      this.Details = res["data"];


      const counts = {};
      this.Details.forEach((x) => {
        // console.log(x);
        counts[x.Source] = (counts[x.Source] || 0) + 1;
      });
      console.log(counts);
      var d = JSON.stringify(counts);
      d = JSON.parse(d);
      let map = new Map();
      Object.keys(d).forEach(key => {
          map.set(key, d[key]);
          this.pieChartColors[0].backgroundColor.push(this.getRandomColor())
      });
      this.pieChartLabels = [...map.keys()];
      this.pieChartData = [...map.values()];
    })
  }



  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public randomColor() {
    let randomize = Math.floor(Math.random() * 16777215).toString(16);
    return randomize;
  }
}
