import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

import { convertReadingListItemToBook } from '@tmo/shared/testing';
import { ReadingListItem, UNDO_DURATION } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})

export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar('Removed ' + item.title + ' from reading list!', 'Undo', item);
  }

  openSnackBar(message: string, action: string, item: ReadingListItem) {
    const duration = UNDO_DURATION;
    const snackBarRef = this._snackBar.open(message, action, {
      duration,
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book: convertReadingListItemToBook(item) }));
    });
  }
}
