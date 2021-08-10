import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CountryService } from "../../services/country.service";
import { CountryModel } from "../../model/country.model";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";

@Injectable()

export class CountryEffect{
  countryData: any;
  queryData$ = this.store.select((store) => store.search);

  searchQueary: any;
  searchKey: any;

  constructor(private actions$: Actions,
              private countryService: CountryService,
              private store: Store<AppState>) {

    this.queryData$.subscribe(
      data => {
        this.searchQueary = data;
      })
  }

  getCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Country Api] Invoke API'),
      mergeMap(() =>
      this.countryService
        .countryInfo(this.searchQueary).pipe(
          map((countryinfo) => (
            this.countryData = <CountryModel>countryinfo,
            {type: '[Country API] Country Api Success',
              countryInfo: this.countryData }))
      ))
    )
  )

}
