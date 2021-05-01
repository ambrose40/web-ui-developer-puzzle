import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  BOOKS_FEATURE_KEY,
  reducer as fromBooksReducer,
} from './+state/books.reducer';
import { BooksEffects } from './+state/books.effects';
import {
  READING_LIST_FEATURE_KEY,
  reducer as fromReadingListReducer,
} from './+state/reading-list.reducer';
import { ReadingListEffects } from './+state/reading-list.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BOOKS_FEATURE_KEY, fromBooksReducer),
    StoreModule.forFeature(READING_LIST_FEATURE_KEY, fromReadingListReducer),
    EffectsModule.forFeature([BooksEffects, ReadingListEffects]),
  ],
})
export class BooksDataAccessModule {}
