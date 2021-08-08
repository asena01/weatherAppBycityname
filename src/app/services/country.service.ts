import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError} from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  concatString = '?fullText=true';
  countryApiUrl = environment.countryBaseUrl;
  searchKey = 'Finland';

  constructor(private _http: HttpClient) {}

  countryInfo(searchCountry: any): Observable<any> {
    if(searchCountry != null) {
      this.searchKey = searchCountry.searchQuery;
    }
    const url = this.countryApiUrl + this.searchKey + this.concatString;
    return this._http.get(url)
      .pipe(
        catchError(err => {
          return throwError('error retrieving country information')
        })
      );
  }
}
