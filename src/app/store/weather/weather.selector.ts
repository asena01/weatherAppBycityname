import { createSelector } from '@ngrx/store';
import { WeatherDataModel } from "../../model/weather-data.model";
import { AppState } from "../app.state";


export const weatherSelector = (state: AppState) => state.weather;

export const weatherName = createSelector(
  weatherSelector,
  (weather: WeatherDataModel[]) => {
    return [...new Set(weather)] ;
  }
);
