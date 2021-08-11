import { createAction, props } from "@ngrx/store";
import { SearchModel } from "../../model/search.model";

export const SET_SEARCH_QUERY = '[Search] set query';

export const SetSearchQuery = createAction(
  SET_SEARCH_QUERY,
  props<{searchQuery: SearchModel}>()
)


