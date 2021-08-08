import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError} from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  concatString = '&query='
  apiToken = environment.apiToken;
  weatherApiUrl = environment.weatherBaseUrl;
  searchKey = 'helsinki';

  constructor(private _http: HttpClient) {}
  weatherInfo(searchCity: any): Observable<any> {
    if(searchCity.length>0) {
      this.searchKey = searchCity[0].capital;
    }
    const url = this.weatherApiUrl + this.apiToken + this.concatString + this.searchKey;
    return this._http.get(url)
      .pipe(
        catchError(err => {
          return throwError('error retrieving city weather')
        })
      );
  }
}
