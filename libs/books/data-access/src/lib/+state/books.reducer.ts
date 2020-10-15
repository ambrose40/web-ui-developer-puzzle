import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '@tmo/shared/models';

import { searchBooks, searchBooksFailure, searchBooksSuccess, clearSearch } from './books.actions';

export const BOOKS_FEATURE_KEY = 'books';

export interface State extends EntityState<Book> {
  loaded: boolean;
  error?: string | null;
  searchTerm?: string;
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: State;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = booksAdapter.getInitialState({
  loaded: false,
});

const booksReducer = createReducer(
  initialState,
  on(searchBooks, (state, { term }) => ({
    ...state,
    searchTerm: term,
    loaded: false,
    error: null,
  })),
  on(searchBooksSuccess, (state, action) =>
    booksAdapter.setAll(action.books, {
      ...state,
      loaded: true,
    })
  ),
  on(searchBooksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(clearSearch, (state) => booksAdapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}
