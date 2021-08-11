import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { WeatherService } from "../../services/weather.service";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";

import { WeatherDataModel } from "../../model/weather-data.model";
import { SET_WEATHER_INFO, INVOKE_WEATHER_API } from "./weather.action";

@Injectable()

export class WeatherEffect{
  weatherData: any;
  selectCity: any;
  searchCity$ = this.store.select((store) => store.country);

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
      ofType(INVOKE_WEATHER_API),
      mergeMap(() =>
      this.weatherService.getWeatherInfo(this.selectCity)
        .pipe(
          map((weather) => (
            this.weatherData = weather,
              this.weatherData = <WeatherDataModel>weather,
            {type: SET_WEATHER_INFO, weatherInfo: this.weatherData}))
          )
        )
      )
  )
}
