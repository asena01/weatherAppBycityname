import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from "../app.state";

const weatherSelector = createFeatureSelector<AppState>('weather');

export const weatherName = createSelector(weatherSelector,(state) =>{
  return state;
});
