import { CountryModel } from "../model/country.model";
import { WeatherDataModel } from "../model/weather-data.model";
import { SearchModel } from "../model/search.model";

export interface AppState {
  country: CountryModel[];
  weather: WeatherDataModel[];
  search: SearchModel;
}

export interface SpinnerState {
  showLoading: boolean;
  errorMessage: string;
}

export const initialState: SpinnerState = {
  showLoading: false,
  errorMessage: '',
}

