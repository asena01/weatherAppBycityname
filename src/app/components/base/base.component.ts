import { Component, OnInit } from '@angular/core';
import { Store, select} from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { invokeCountryApi } from "../../store/country/country.action";
import { invokeWeatherApi } from "../../store/weather/weather.action";
import { AppState } from "../../store/app.state";

import { countryByName } from "../../store/country/country.selector";
import { weatherName } from "../../store/weather/weather.selector";
import { SetSearchQuery } from "../../store/search/search.action";
import { pluck } from "rxjs/internal/operators";
import { CountryList } from "../../model/country-list";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  countryinfo: any;
  weatherInfo: any;
  previousCountryName = '';
  searchedCountryName = '';
  isDataAvailable = false;
  noSearchQuery = false;
  isSearchQuery = false;
  countryList = new CountryList();
  searchKeyForBaseUrl = '';

  constructor(private store: Store<AppState>,
              private actRoute: ActivatedRoute) {}

  country_name$ = this.store.pipe(select(countryByName));
  weather_by_city$ = this.store.pipe(select(weatherName));

  ngOnInit(): void {
    /*if (!this.actRoute.snapshot.queryParams['search']) {
      this.noSearchQuery = true;
      console.log(this.countryList.lists[this.getRandomArbitrary(1, 100)]);
      this.searchKeyForBaseUrl = this.countryList.lists[this.getRandomArbitrary(1, 100)];
      this.store.dispatch(new SetSearchQuery(this.searchKeyForBaseUrl));
      this.searchedCountryName = this.searchKeyForBaseUrl;
      this.store.dispatch(invokeCountryApi());

      this.searchForCountry();
      this.searchForWeather();
    }*/

      this.actRoute.queryParams
        .pipe(
          pluck('search'))
        .subscribe(search => {
          if(!this.searchedCountryName) {
            this.noSearchQuery = true;
            this.isSearchQuery = false;
            this.searchKeyForBaseUrl = this.countryList.lists[this.getRandomIndexForCountrySelect(1, 100)];
            this.store.dispatch(new SetSearchQuery(this.searchKeyForBaseUrl));
            this.searchedCountryName = this.searchKeyForBaseUrl;
            this.store.dispatch(invokeCountryApi());

            this.searchForCountry();
            this.searchForWeather();
          } else {
            this.noSearchQuery = false;
            this.isSearchQuery = true;
            this.store.dispatch(new SetSearchQuery(search));
            this.searchedCountryName = search;
            this.store.dispatch(invokeCountryApi());

            this.searchForCountry();
            this.searchForWeather();
          }
        });


  }
  searchForCountry() {
    this.country_name$.subscribe(
      data => {
        this.countryinfo = data;
        if(this.countryinfo.length>0) {
          this.store.dispatch(invokeWeatherApi());
          this.previousCountryName = this.countryinfo[0].name;
          if(this.previousCountryName == this.searchedCountryName) {
            this.isDataAvailable = true;
          } else {
            this.isDataAvailable = false;
            this.noSearchQuery = false;
            this.isSearchQuery = false;
          }
        }
      });
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
