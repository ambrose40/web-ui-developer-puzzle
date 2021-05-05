import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update((list) => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest,
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update((list) => {
      return list.filter((x) => x.bookId !== id);
    });
  }

  async finishBook(id: string): Promise<void> {
    const readingList = await this.getList();
    readingList.forEach((item: ReadingListItem) => {
      if (item.bookId === id) {
        if (item.finished) {
          item.finished = false;
          item.finishedDate = '';
        } else {
          const today = new Date();
        item.finishedDate = today.toISOString();
        item.finished = true;
        }
      }
    });

    this.storage.update(() => {
      return readingList;
    });
  }
}
