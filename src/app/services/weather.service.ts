import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError} from "rxjs";
import { environment } from "../../environments/environment";
import {map, mergeMap} from "rxjs/internal/operators";
import { weathModFordata } from "../model/weather-data.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  concatString = '&query='
  apiToken = environment.apiToken;
  weatherApiUrl = environment.weatherBaseUrl;
  searchKey = 'helsinki';
  wetherDataPush = new weathModFordata();
  weatherUpdate: any;
  weatherData: any;

  constructor(private _http: HttpClient) {}

  getWeatherInfo(searchCity: any): Observable<any>  {
    const url = this.weatherApiUrl + this.apiToken + this.concatString + this.searchKey;

    if(searchCity.length>0) {
      this.searchKey = searchCity[0].capital;
    }

    return this._http.get(url).pipe(
      map((weather) => {
        this.weatherData = weather,
          this.wetherDataPush.data[0].city = this.weatherData.location.name;
          this.wetherDataPush.data[0].localtime = this.weatherData.location.localtime;
          this.wetherDataPush.data[0].temprature = this.weatherData.current.temperature;
          this.wetherDataPush.data[0].weather_icons = this.weatherData.current.weather_icons;
          this.wetherDataPush.data[0].weather_descriptions = this.weatherData.current.weather_descriptions[0];
          this.wetherDataPush.data[0].wind_speed = this.weatherData.current.wind_speed;
          this.wetherDataPush.data[0].wind_degree = this.weatherData.current.wind_degree;
          this.wetherDataPush.data[0].wind_dir = this.weatherData.current.wind_dir;
          this.wetherDataPush.data[0].pressure = this.weatherData.current.pressure;
          this.wetherDataPush.data[0].humidity = this.weatherData.current.humidity;
          this.wetherDataPush.data[0].feelslike = this.weatherData.current.feelslike;
          this.weatherUpdate = this.wetherDataPush.data;
          this.wetherDataPush = new weathModFordata();

          return this.weatherUpdate;
      })
    ).pipe(
      catchError(err => {
        return throwError('error retrieving city weather')
      })
    )
  }
}
