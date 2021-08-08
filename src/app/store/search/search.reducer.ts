import { on } from '@ngrx/store';

export const SET_SEARCH_QUERY = '[Search] set query';

export function searchReducer(state: any, action: any) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      }
    default:
      return state;
  }
}
