import { Action, createReducer, on } from '@ngrx/store';

import { SearchActions } from '../actions/search.actions';
import { ICurrentWeather } from '../icurrent-weather.interface';
import { defaultWeather } from '../weather/weather.service';

export const searchFeatureKey = 'search';

export interface State {
  current: ICurrentWeather;
}

export const initialState: State = {
  current: defaultWeather,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.weatherLoaded, (state, action) => {
    return {
      ...state,
      current: action.current,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action);
}
