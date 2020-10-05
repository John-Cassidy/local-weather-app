import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment'; // nice!
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ICurrentWeather } from '../icurrent-weather.interface';
import { PostalCodeService } from '../postal-code/postal-code.service';

export interface IWeatherService {
  readonly currentWeather$: BehaviorSubject<ICurrentWeather>;
  getCurrentWeather(search: string, country?: string): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>;
  updateCurrentWeather(search: string, country?: string): void;
}
interface ICurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}
export const defaultWeather: ICurrentWeather = {
  city: '--',
  country: '--',
  date: Date.now(),
  image: '',
  temperature: 0,
  description: '',
};

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  readonly currentWeather$: BehaviorSubject<ICurrentWeather> = new BehaviorSubject<
    ICurrentWeather
  >(defaultWeather);

  constructor(
    private httpClient: HttpClient,
    private postalCodeService: PostalCodeService
  ) {}

  updateCurrentWeather(searchText: string, country?: string): void {
    this.getCurrentWeather(searchText, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    );
  }

  getCurrentWeather(searchText: string, country?: string): Observable<ICurrentWeather> {
    return this.postalCodeService.resolvePostalCode(searchText, country).pipe(
      switchMap((postalCode) => {
        if (postalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          } as Coordinates);
        } else {
          const uriParams = new HttpParams().set(
            'q',
            country ? `${searchText},${country}` : searchText
          );

          return this.getCurrentWeatherHelper(uriParams);
        }
      })
    );
  }
  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());

    return this.getCurrentWeatherHelper(uriParams);
  }
  private getCurrentWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
    uriParams = uriParams.set('appid', environment.appId);

    const url = `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`;
    return this.httpClient
      .get<ICurrentWeatherData>(url, { params: uriParams })
      .pipe(map((data) => this.tranformToICurrentWeather(data)));
  }
  private tranformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    };
  }
  convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67;
  }
}
