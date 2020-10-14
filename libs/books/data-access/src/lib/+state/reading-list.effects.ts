import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import {
  addToReadingList,
  confirmedAddToReadingList,
  confirmedRemoveFromReadingList,
  failedAddToReadingList,
  failedRemoveFromReadingList,
  init as ReadingListActionsInit,
  loadReadingListError,
  loadReadingListSuccess,
  removeFromReadingList,
} from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActionsInit),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) => loadReadingListSuccess({ list: data })),
          catchError((error) => of(loadReadingListError({ error })))
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => confirmedAddToReadingList({ book })),
          catchError(() => of(failedAddToReadingList({ book })))
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() => confirmedRemoveFromReadingList({ item })),
          catchError(() => of(failedRemoveFromReadingList({ item })))
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActionsInit();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
