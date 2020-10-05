import { BehaviorSubject, Observable, of } from 'rxjs';

import { ICurrentWeather } from '../icurrent-weather.interface';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
  city: 'Boston',
  country: 'US',
  date: 1485789600,
  image: '',
  temperature: 280.32,
  description: 'light intensity drizzle',
};

export class WeatherServiceFake implements IWeatherService {
  currentWeather$: BehaviorSubject<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
  updateCurrentWeather(search: string, country?: string): void {}
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
  updateCurrentLocalWeather(coord: Coordinates): void {}
}
