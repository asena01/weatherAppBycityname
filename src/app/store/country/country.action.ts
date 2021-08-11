import { createAction, props } from '@ngrx/store';
import { CountryModel } from "../../model/country.model";

export const SET_COUNTRY_INFO = '[Country API] Country Api Success';
export const INVOKE_COUNTRY_API = '[Country Api] Invoke API';

export const retrieveCountryInfo = createAction(
  SET_COUNTRY_INFO,
  props<{countryInfo:CountryModel[]}>()
);

export const invokeCountryApi = createAction(INVOKE_COUNTRY_API)


