import { booksAdapter, BooksPartialState, initialState } from './books.reducer';
import { getBooks, getBooksError, getBooksLoaded } from './books.selectors';
import { createBook } from '@tmo/shared/testing';

describe('Books Selectors', () => {
  let state: BooksPartialState;

  beforeEach(() => {
    state = {
      books: booksAdapter.addMany(
        [createBook('A'), createBook('B'), createBook('C')],
        {
          ...initialState,
          error: 'Unknown error',
          loaded: true,
        }
      ),
    };
  });

  describe('Books Selectors', () => {
    it('getBooks() should return the list of Books', () => {
      const results = getBooks(state);

      expect(results.length).toBe(3);
      expect(results.map((x) => x.id)).toEqual(['A', 'B', 'C']);
    });

    it("getBooksLoaded() should return the current 'loaded' status", () => {
      const result = getBooksLoaded(state);

      expect(result).toBe(true);
    });

    it("getBooksError() should return the current 'error' state", () => {
      const result = getBooksError(state);

      expect(result).toEqual('Unknown error');
    });
  });
});
