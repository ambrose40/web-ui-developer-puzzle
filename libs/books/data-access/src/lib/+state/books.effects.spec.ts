import { HttpTestingController } from '@angular/common/http/testing';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';

import { searchBooks, searchBooksSuccess } from './books.actions';
import { BooksEffects } from './books.effects';

describe('BooksEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: BooksEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        BooksEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BooksEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadBooks$', () => {
    it('should work', (done) => {
      actions = new ReplaySubject();
      actions.next(searchBooks({ term: '' }));

      effects.searchBooks$
      .pipe(debounceTime(500))
      .subscribe((action) => {
        expect(action).toEqual(
          searchBooksSuccess({ books: [createBook('A')] })
        );
        done();
      });

      httpMock.expectOne('/api/books/search?q=').flush([createBook('A')]);
    });
  });
});
