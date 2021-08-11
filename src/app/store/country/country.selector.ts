import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from "../app.state";

const countrySelector = createFeatureSelector<AppState>('country');

export const countryByName = createSelector(countrySelector,(state) =>{
  return state;
  });


