import { createReducer, on } from '@ngrx/store';
import { WeatherDataModel } from "../../model/weather-data.model";
import { retrieveWeatherInfo } from "./weather.action";

export const initialState: ReadonlyArray<WeatherDataModel> = [];


const _weatherReducer = createReducer(
  initialState,
  on(retrieveWeatherInfo, (state, {weatherInfo}) => {
    return [...weatherInfo];
  })
);

export function weatherReducer(state: any, action: any) {
  return _weatherReducer(state, action)
}
