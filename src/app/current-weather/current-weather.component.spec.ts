import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { WeatherServiceFake } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents();
    weatherServiceMock = injectSpy(WeatherService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    // arrange
    await weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // act
    fixture.detectChanges(); // griggers ngOnInit

    // assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', async () => {
    // Arrange
    await weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges(); // triggers ngOnInit()

    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  // it('should eagerly load currentWeather in Boston from weatherService', () => {
  //   // arrange
  //   weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

  //   // act
  //   fixture.detectChanges(); // triggers ngOnInit()

  //   // assert
  //   expect(component.current).toBeDefined();
  //   expect(component.current.city).toEqual('Boston');

  //   // assert on DOM
  //   const debugE1 = fixture.debugElement;
  //   const titleE1: HTMLElement = debugE1.query(By.css('span')).nativeElement;
  //   expect(titleE1.textContent).toContain('Boston');
  // });
});
