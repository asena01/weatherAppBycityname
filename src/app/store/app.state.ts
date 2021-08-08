import { CountryModel } from "../model/country.model";
import { WeatherDataModel } from "../model/weather-data.model";
import { SearchModel } from "../model/search.model";

export interface AppState {
  country: CountryModel[];
  weather: WeatherDataModel[];
  search: SearchModel;
}
