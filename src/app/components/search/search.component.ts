import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { SetSearchQuery } from "../../store/search/search.action";
import { AppState } from "../../store/app.state";
import { Router } from "@angular/router";
import { CountryList } from "../../model/country-list";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchString = '';
  listsOfCountries = new CountryList();

  countries = this.listsOfCountries.lists;
  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }

  searchCurrentWeather() {
    this.setSearchQueryParams(this.searchString);
  }

  setSearchQueryParams(searchKey: string) {
    this.router.navigate([], {queryParams: {search: searchKey}})
  }

  onEnter() {
    this.searchCurrentWeather();
  }
}
