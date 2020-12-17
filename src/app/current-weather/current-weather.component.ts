import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { SubSink } from 'subsink';

import { ICurrentWeather } from '../icurrent-weather.interface';
import * as appStore from '../reducers';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent {
  current$: Observable<ICurrentWeather>;
  private subscriptions: SubSink = new SubSink();

  constructor(
    private weatherService: WeatherService,
    private store: Store<appStore.State>
  ) {
    this.current$ = merge(
      this.store.pipe(select(appStore.selectCurrentWeather)),
      this.weatherService.currentWeather$
    );
    // this.current$ = this.store.pipe(
    //   select((state: appStore.State) => state.search.current)
    // );
    // this.current$ = this.weatherService.currentWeather$;
  }

  public getOrdinal(date: number): string {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }
}
