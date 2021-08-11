import { Action } from '@ngrx/store';

export const SET_SEARCH_QUERY = '[Search] set query';

export class SetSearchQuery implements Action {
  readonly type = SET_SEARCH_QUERY;
  constructor(public payload: any) {}
}

export type SetSearch = SetSearchQuery;


