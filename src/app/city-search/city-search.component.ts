import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';

import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent implements OnInit {
  public search: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => !this.search.invalid),
        tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe();
  }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService.updateCurrentLocalWeather({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      } as Coordinates);
      console.log('position', position);
    });
  }

  doSearch(searchValue: string): void {
    const userInput = searchValue.split(',').map((s) => s.trim());
    const searchText = userInput[0];
    const country = userInput.length > 1 ? userInput[1] : undefined;
    this.weatherService.updateCurrentWeather(searchText, country);
  }

  getErrorMessage(): string {
    return this.search.hasError('minLength')
      ? 'Type more than one character to search'
      : '';
  }
}
