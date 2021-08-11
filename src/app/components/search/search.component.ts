import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router) { }

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
