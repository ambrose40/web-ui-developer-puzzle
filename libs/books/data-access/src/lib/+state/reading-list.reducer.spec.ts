import {
  addToReadingList,
  failedAddToReadingList,
  failedRemoveFromReadingList,
  loadReadingListSuccess,
  markAsFinished,
  removeFromReadingList,
} from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State,
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C'),
      ];
      const action = loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('failedAddToReadingList should undo book addition to the state', () => {
      const action = failedAddToReadingList({
        book: createBook('C'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B']);
    });

    it('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = failedRemoveFromReadingList({
        item: createReadingListItem('B'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B']);
    });

    it('addToReadingList should add book to reading list', () => {
      const action = addToReadingList({
        book: createBook('C'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });

    it('removeFromReadingList should remove book from reading list', () => {
      const action = removeFromReadingList({
        item: createReadingListItem('B'),
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A']);
    });

    it('markAsFinished should mark book as finished', () => {
      const action = markAsFinished({
        item: createReadingListItem('A'),
      });

      const result: State = reducer(state, action);
      const [first] = Object.values(result.entities);
      expect(first.finished).toBe(true);
      expect(result.ids).toEqual(['A', 'B']);
    });

    it('markAsFinished should unmark book as finished', () => {
      const mark = markAsFinished({
        item: createReadingListItem('A'),
      });

      const resultMark: State = reducer(state, mark);
      const [first] = Object.values(resultMark.entities);
      expect(first.finished).toBe(true);
      expect(resultMark.ids).toEqual(['A', 'B']);
      const unmark = markAsFinished({
        item: first,
      });

      const resultUnmark: State = reducer(state, unmark);
      const [second] = Object.values(resultUnmark.entities);
      expect(second.finished).toBe(false);
      expect(resultUnmark.ids).toEqual(['A', 'B']);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
