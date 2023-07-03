import { Component, OnInit} from '@angular/core';
import { WeatherReportService } from '../weather-report.service';
import { ActivatedRoute} from '@angular/router';
import { Observable, concat, concatMap, filter, map, tap } from 'rxjs';
import { getLocaleDateTimeFormat } from '@angular/common';



@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {
  data$!: Observable<any>;
  today:Date= new Date();
  dt:string = this.today.toLocaleTimeString();
  
  // const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000) ;

  loading =false;

  constructor( private ws:WeatherReportService,private rt:ActivatedRoute){}
 
  ngOnInit(){
   this.data$ = this.rt.params.pipe(
    map((params)=>params["locationName"]),
    filter((name)=>!!name),
    tap(()=>{
      this.loading = true;
    }),
    concatMap((name)=>this.ws.getWeatherForCity(name)),
    tap(()=>{
      this.loading =false;
    })
   );
  }

}
