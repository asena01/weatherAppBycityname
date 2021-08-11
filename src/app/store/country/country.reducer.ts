import { createReducer, on } from '@ngrx/store';
import { CountryModel } from "../../model/country.model";
import { retrieveCountryInfo } from "./country.action";

export const initialState: ReadonlyArray<CountryModel> = [];

const _countryReducer = createReducer(
  initialState,
  on(retrieveCountryInfo, (state, {countryInfo}) =>{
    return [...countryInfo]
  })
);

export function countryReducer(state: any, action: any) {
  return _countryReducer(state, action)
}



