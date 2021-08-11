import { setErrorMessage, setLoadingSpinner } from "./spinner.action";
import { createReducer, on } from "@ngrx/store";
import { initialState } from "../app.state";

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) =>{
    return {
      ...state,
      showLoading: action.status,
    }
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    }
  })
)

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action)
}
