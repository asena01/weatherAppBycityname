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

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  countryinfo: any;
  weatherInfo: any;

  constructor(private store: Store<AppState>,
              private actRoute: ActivatedRoute) {}

  country_name$ = this.store.pipe(select(countryByName));
  weather_by_city$ = this.store.pipe(select(weatherName));

  ngOnInit(): void {
    this.actRoute.queryParams
      .pipe(
       pluck('search'))
      .subscribe(search => {
        this.store.dispatch(new SetSearchQuery(search));
        this.store.dispatch(invokeCountryApi());
      });

    this.country_name$.subscribe(
      data => {
        this.countryinfo = data;
        if(this.countryinfo.length>0) {
          this.store.dispatch(invokeWeatherApi())
        }
      });

    this.weather_by_city$.subscribe(
      data => {
        this.weatherInfo = data;
      });
  }

}
