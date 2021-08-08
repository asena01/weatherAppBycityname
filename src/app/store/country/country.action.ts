import { createAction, props } from '@ngrx/store';
import { CountryModel } from "../../model/country.model";

export const retrieveCountryInfo = createAction(
  "[Country API] Country Api Success",
  props<{countryInfo:CountryModel[]}>()
);

export const invokeCountryApi = createAction('[Country Api] Invoke API')
