import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { WeatherService } from "../../services/weather.service";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";

import { weathModFordata } from "../../model/weather-data.model";

@Injectable()

export class WeatherEffect{
  weatherData: any;
  selectCity: any;
  searchCity$ = this.store.select((store) => store.country);
  wetherDataPush = new weathModFordata();
  weatherUpdate: any;

  constructor(private actions$: Actions,
              private weatherService: WeatherService,
              private store: Store<AppState>){
    this.searchCity$.subscribe(
      data => {
          this.selectCity = data;
      }
    )
  }

  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Weather Api] Invoke API'),
      mergeMap(() =>
      this.weatherService
        .weatherInfo(this.selectCity).pipe(
          map((weather) => (
            this.weatherData = weather,
              this.wetherDataPush.data[0].city = this.weatherData.location.name,
              this.wetherDataPush.data[0].localtime = this.weatherData.location.localtime,
              this.wetherDataPush.data[0].temprature = this.weatherData.current.temperature,
              this.wetherDataPush.data[0].weather_icons = this.weatherData.current.weather_icons,
              this.wetherDataPush.data[0].weather_descriptions = this.weatherData.current.weather_descriptions[0],
              this.wetherDataPush.data[0].wind_speed = this.weatherData.current.wind_speed,
              this.wetherDataPush.data[0].wind_degree = this.weatherData.current.wind_degree,
              this.wetherDataPush.data[0].wind_dir = this.weatherData.current.wind_dir,
              this.wetherDataPush.data[0].pressure = this.weatherData.current.pressure,
              this.wetherDataPush.data[0].humidity = this.weatherData.current.humidity,
              this.wetherDataPush.data[0].feelslike = this.weatherData.current.feelslike,
              this.weatherUpdate = this.wetherDataPush.data,
              this.wetherDataPush = new weathModFordata(),
            {type: '[Weather API] Weather Api Succsess', weatherInfo: this.weatherUpdate}))
          )
        )
      )
  )
}
