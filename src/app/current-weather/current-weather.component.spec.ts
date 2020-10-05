import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { MaterialModule } from '../material.module';
import { WeatherService } from '../weather/weather.service';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;
  // const initialState = { search: { current: defaultWeather } };

  beforeEach(async () => {
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    );
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [MaterialModule],
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

  // it('should get currentWeather from weatherService', async () => {
  //   // Arrange
  //   await weatherServiceMock.currentWeather$.next(fakeWeather);

  //   // Act
  //   fixture.detectChanges(); // triggers ngOnInit()

  //   // Assert
  //   expect(component.current$).toBeDefined();
  // });

  // it('should eagerly load currentweather in boston from weatherservice', () => {
  //   // arrange
  //   weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

  //   // act
  //   fixture.detectChanges(); // triggers ngoninit()

  //   // assert
  //   expect(component.current$).toBeDefined();
  //   // expect(component.current$.city).toEqual('Boston');
  // });

  // it('should display current weather information correctly', () => {
  //   // arrange
  //   weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

  //   // act
  //   fixture.detectChanges(); // triggers ngoninit()

  //   // assert
  //   expect(component.current$).toBeDefined();
  //   // expect(component.current.city).toEqual('Boston');

  //   // assert on dom
  //   const debuge1 = fixture.debugElement;
  //   const titlee1: HTMLElement = debuge1.query(By.css('.mat-title')).nativeElement;
  //   expect(titlee1.textContent).toContain('Boston, US');
  //   const datee1: HTMLElement = debuge1.query(By.css('.mat-subheading-2')).nativeElement;
  //   expect(datee1.textContent).toContain('Saturday Jan 17th');
  //   const tempe1: HTMLElement = debuge1.query(By.css('.mat-display-3')).nativeElement;
  //   expect(tempe1.textContent).toContain('280');
  //   const desce1: HTMLElement = debuge1.query(By.css('.mat-caption')).nativeElement;
  //   expect(desce1.textContent).toContain('light intensity drizzle');
  // });
});
