import { HttpService, Injectable } from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpService) {}

  search(term: string): Observable<Book[]> {
    if (!term) {
      throw new Error('Missing serach term');
    }

    return this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .pipe(
        map((resp) => {
          return resp.data.items.map(
            ({
              id,
              volumeInfo,
              searchInfo,
            }: {
              id: string;
              volumeInfo?: {
                title: string;
                authors: string[];
                publisher: string;
                publishedDate: string;
                imageLinks?: {
                  thumbnail: string;
                };
              };
              searchInfo?: {
                textSnippet: string;
              };
            }) => {
              return {
                id,
                title: volumeInfo?.title,
                authors: volumeInfo?.authors || [],
                description: searchInfo?.textSnippet,
                publisher: volumeInfo?.publisher,
                publishedDate: volumeInfo?.publishedDate
                  ? new Date(volumeInfo?.publishedDate).toISOString()
                  : undefined,
                coverUrl: volumeInfo?.imageLinks?.thumbnail,
              };
            }
          );
        })
      );
  }
}
