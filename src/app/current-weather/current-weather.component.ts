import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { ICurrentWeather } from '../icurrent-weather.interface';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  current: ICurrentWeather;
  private subscriptions: SubSink = new SubSink();

  constructor(private weatherService: WeatherService) {
    // this.current = {
    //   city: 'Boston',
    //   country: 'US',
    //   date: new Date(),
    //   image: 'assets/img/sunny.svg',
    //   temperature: 72,
    //   description: 'sunny',
    // } as ICurrentWeather;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.weatherService.currentSeather$.subscribe((data) => (this.current = data))
    );
    // this.weatherService.getCurrentWeather('Boston', 'US').subscribe((data) => {
    //   this.current = data;
    // });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getOrdinal(date: number): string {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }
}
