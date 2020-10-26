import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JapaneseWord } from '../models/japaneseWord';

@Injectable({
  providedIn: 'root'
})
export class JapaneseWordService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/japaneseWords/';
  }

  getJapaneseWords(): Observable<JapaneseWord[]> {
    return this.http.get<JapaneseWord[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getJapaneseWord(id): Observable<JapaneseWord> {
      return this.http.get<JapaneseWord>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  addJapaneseWord(japaneseWord): Observable<JapaneseWord> {
      return this.http.post<JapaneseWord>(this.myAppUrl + this.myApiUrl, JSON.stringify(japaneseWord), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateJapaneseWord(id, japaneseWord): Observable<JapaneseWord> {
      return this.http.put<JapaneseWord>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(japaneseWord), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteJapaneseWord(id): Observable<JapaneseWord> {
      return this.http.delete<JapaneseWord>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
