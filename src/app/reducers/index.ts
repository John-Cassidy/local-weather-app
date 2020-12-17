import {
  ActionReducerMap,
  MetaReducer,
  createSelector,
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromSearch from './search.reducer';

export interface State {
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
  search: fromSearch.reducer,
};

export const selectCurrentWeather = createSelector(
  (state: State) => state.search.current,
  (current) => current
);
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
