import { createAction, props } from '@ngrx/store';
import { WeatherDataModel } from "../../model/weather-data.model";

export const retrieveWeatherInfo = createAction(
  "[Weather API] Weather Api Succsess",
  props<{weatherInfo:WeatherDataModel[]}>()
)

export const invokeWeatherApi = createAction('[Weather Api] Invoke API')
