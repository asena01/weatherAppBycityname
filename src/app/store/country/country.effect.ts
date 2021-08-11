import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError,switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Store, select } from "@ngrx/store";

import { setLoadingSpinner, setErrorMessage} from "../spinner/spinner.action";
import { INVOKE_COUNTRY_API, SET_COUNTRY_INFO} from "./country.action";
import { SET_EROR_MESSAGE } from "../spinner/spinner.action";

import { CountryService } from "../../services/country.service";
import { AppState, SpinnerState} from "../app.state";
import { CountryModel } from "../../model/country.model";
import { getSearchQuery } from "../search/search.selector";

@Injectable()

export class CountryEffect{
  countryData: any;
  queryData$ = this.store.pipe(select(getSearchQuery));
  searchQueary: any;

  constructor(private actions$: Actions,
              private countryService: CountryService,
              private store: Store<AppState>,
              private spinnerStore: Store<SpinnerState>) {

    this.queryData$.subscribe(
      data => {
        this.searchQueary = data;
      });

  }

  getCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(INVOKE_COUNTRY_API),
      switchMap(() =>
        this.countryService
          .countryInfo(this.searchQueary).pipe(
          map((countryinfo) => {
                this.countryData = <CountryModel>countryinfo;
                this.spinnerStore.dispatch(setErrorMessage({message: ''}))
                this.spinnerStore.dispatch(setLoadingSpinner({status: false}));

                return {
                  type: SET_COUNTRY_INFO,
                  countryInfo: this.countryData
                };
            }),
          catchError((err) =>{
            this.spinnerStore.dispatch(setLoadingSpinner({status: false}));

            return of({
              type: SET_EROR_MESSAGE,
              message: {err}
            });
          })
        )
      )
    )
  )

}
