import { SpinnerState } from "../app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SpinnerState>(SHARED_STATE_NAME)

export const getLoading = createSelector(getSharedState, (state) =>{
  return state.showLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
})
