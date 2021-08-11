import { AppState } from "../app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const SEARCH_STATE_NAME = 'search';

const getSearchState = createFeatureSelector<AppState>(SEARCH_STATE_NAME)

export const getSearchQuery = createSelector(getSearchState, (state) =>{
  return state;
});
