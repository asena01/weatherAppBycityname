import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select} from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { invokeCountryApi } from "../../store/country/country.action";
import { invokeWeatherApi } from "../../store/weather/weather.action";
import { AppState } from "../../store/app.state";
import { countryByName } from "../../store/country/country.selector";
import { weatherName } from "../../store/weather/weather.selector";
import { SetSearchQuery } from "../../store/search/search.action";
import { pluck, takeUntil} from "rxjs/internal/operators";
import { CountryList } from "../../model/country-list";
import { Subject } from "rxjs";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  countryinfo: any;
  weatherInfo: any;
  previousCountryName = '';
  searchedCountryName = '';
  isDataAvailable = true;
  countryList = new CountryList();
  searchKeyForBaseUrl = '';
  searching = true;
  randomIndexCountry: any;

  constructor(private store: Store<AppState>,
              private actRoute: ActivatedRoute,
              ) {}

  country_name$ = this.store.pipe(select(countryByName));
  weather_by_city$ = this.store.pipe(select(weatherName));

  ngOnInit(): void {
      this.actRoute.queryParams
        .pipe(
          pluck('search'))
        .subscribe(search => {
          if(!search) {
            this.randomIndexCountry = this.getRandomIndexForCountrySelect(1, 100);
            this.searchKeyForBaseUrl = this.countryList.lists[this.randomIndexCountry];
            this.store.dispatch(new SetSearchQuery(this.searchKeyForBaseUrl));
            this.searchedCountryName = this.searchKeyForBaseUrl;
            this.store.dispatch(invokeCountryApi());
            this.searchForCountry();
            this.store.dispatch(invokeWeatherApi());
            this.searchForWeather();
          } else {
            this.store.dispatch(new SetSearchQuery(search));
            this.searchedCountryName = search;
            this.store.dispatch(invokeCountryApi());
            this.searchForCountry();
            this.store.dispatch(invokeWeatherApi());
            this.searchForWeather();
          }
        });
  }
  searchForCountry() {
  this.searching = true;
  this.country_name$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
    data => {
      this.countryinfo = data;
      if(this.countryinfo.length>0) {
        this.previousCountryName = this.countryinfo[0].name;
        if(this.previousCountryName == this.searchedCountryName) {
          this.isDataAvailable = true;
          this.searching = false;
        }
        else {
          this.isDataAvailable = false;
          this.searching = false;
        }
      }
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
  ngOnDestroy () {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
