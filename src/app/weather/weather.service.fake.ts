import { Observable, of } from 'rxjs';

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
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
