import { createAction, props } from '@ngrx/store';
import { WeatherDataModel } from "../../model/weather-data.model";

export const SET_WEATHER_INFO = '[Weather API] Weather Api Succsess';
export const INVOKE_WEATHER_API = '[Weather Api] Invoke API';

export const retrieveWeatherInfo = createAction(
  SET_WEATHER_INFO,
  props<{weatherInfo:WeatherDataModel[]}>()
)

export const invokeWeatherApi = createAction(INVOKE_WEATHER_API)
