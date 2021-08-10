import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() countryinfo: any;
  @Input() weatherInfo: any;

  constructor() { }

  ngOnInit(): void {
  }

}
