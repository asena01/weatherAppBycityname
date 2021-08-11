import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { pluck } from "rxjs/internal/operators";
import { Store, select} from "@ngrx/store";

import { invokeCountryApi } from "../../store/country/country.action";
import { invokeWeatherApi } from "../../store/weather/weather.action";
import { setLoadingSpinner } from "../../store/spinner/spinner.action";
import { SetSearchQuery } from "../../store/search/search.action";

import { countryByName } from "../../store/country/country.selector";
import { weatherName } from "../../store/weather/weather.selector";
import { getErrorMessage, getLoading } from "../../store/spinner/spinner.selector";

import { AppState } from "../../store/app.state";
import { SpinnerState } from "../../store/app.state";
import { CountryList } from "../../model/country-list";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  countryinfo: any;
  countryList = new CountryList();
  weatherInfo: any;
  searchKeyForBaseUrl: any;
  randomIndexCountry: any;
  showLoading: any;
  errorMessage: any;
  searchedCountryName: any;

  country_name$ = this.store.pipe(select(countryByName));
  weather_by_city$ = this.store.pipe(select(weatherName));

  constructor(private store: Store<AppState>,
              private spinnerStore: Store<SpinnerState>,
              private actRoute: ActivatedRoute,
              ) {}

  ngOnInit(): void {
    this.actRoute.queryParams
        .pipe(
          pluck('search'))
        .subscribe(search => {
          if(!search) {
            this.spinnerStore.dispatch(setLoadingSpinner({status: true}))
            this.showLoading = this.spinnerStore.select(getLoading);
            this.randomIndexCountry = this.getRandomIndexForCountrySelect(1, 100);
            this.searchKeyForBaseUrl = this.countryList.lists[this.randomIndexCountry];

            this.store.dispatch(new SetSearchQuery(this.searchKeyForBaseUrl));
            this.store.dispatch(invokeCountryApi());
            this.searchForCountry();
            this.store.dispatch(invokeWeatherApi());
            this.searchForWeather();

            this.errorMessage = this.spinnerStore.select(getErrorMessage);
          } else {

            this.spinnerStore.dispatch(setLoadingSpinner({status: true}))
            this.showLoading = this.spinnerStore.select(getLoading);
            this.searchedCountryName = search;

            this.store.dispatch(new SetSearchQuery(search));
            this.store.dispatch(invokeCountryApi());
            this.searchForCountry();
            this.store.dispatch(invokeWeatherApi());
            this.searchForWeather();

            this.errorMessage = this.spinnerStore.select(getErrorMessage);
          }
        });
  }

 searchForCountry() {
   this.country_name$.subscribe(
    data => {
      this.countryinfo = data;
    })
  }

  searchForWeather() {
    this.weather_by_city$.subscribe(
      data => {
        this.weatherInfo = data;
      });
  }

  getRandomIndexForCountrySelect(minRange: number, maxRange: number) {
       minRange = Math.ceil(minRange);
       maxRange = Math.floor(maxRange);
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  }

}
