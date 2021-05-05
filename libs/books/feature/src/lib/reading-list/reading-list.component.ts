import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  markAsFinished,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinished(item: ReadingListItem) {
    this.store.dispatch(markAsFinished({ item }));
  }

  getFinishedButtonColor(item: ReadingListItem) {
    return item.finished ? 'accent' : 'primary';
  }

  formatISODate(strDate: string) {
    return strDate.substring(0, 10);
  }

  finishedText(item: ReadingListItem) {
    return item.finished
      ? 'Reading complete: ' + this.formatISODate(item.finishedDate)
      : 'Not yet read';
  }
}
