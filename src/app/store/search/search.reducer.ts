import { createReducer, on } from "@ngrx/store";
import { SetSearchQuery } from "./search.action";
import { SearchModel } from "../../model/search.model";

export const initialState: ReadonlyArray<SearchModel> = [];

const _searchReducer = createReducer(
  initialState,
  on(SetSearchQuery, (state, action) =>{
    return {
      ...state,
      searchQuery: action.searchQuery,
    }
  })
)

export function searchReducer(state: any, action: any) {
  return _searchReducer(state, action)
}
