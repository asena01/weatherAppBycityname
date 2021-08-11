import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './layout/header/header.component';
import { BaseComponent } from './components/base/base.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CountryEffect } from "./store/country/country.effect";
import { WeatherEffect } from "./store/weather/weather.effect";
import { countryReducer } from "./store/country/country.reducer";
import { weatherReducer } from "./store/weather/weather.reducer";
import { searchReducer } from "./store/search/search.reducer";
import { SharedReducer } from "./store/spinner/spinner.reducer";


import { CountryService } from "./services/country.service";
import { WeatherService } from "./services/weather.service";
import { environment } from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    BaseComponent,
    SearchResultComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([CountryEffect, WeatherEffect]),
    StoreModule.forRoot({
                country: countryReducer,
                weather: weatherReducer,
                search: searchReducer,
                shared: SharedReducer
               },
      ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    TypeaheadModule.forRoot()
  ],
  providers: [ CountryService, WeatherService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
