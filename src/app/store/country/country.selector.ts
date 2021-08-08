import { createSelector } from '@ngrx/store';
import { CountryModel } from "../../model/country.model";
import { AppState } from "../app.state";


export const countrySelector = (state: AppState) => state.country;

export const countryByName = createSelector(
  countrySelector,
  (country: CountryModel[]) => {

     return [...new Set(country)] ;
  }
);

