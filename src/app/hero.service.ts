import { Injectable } from '@angular/core';

import { catchError, Observable, of, tap } from 'rxjs';

import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = "api/heroes"; // For WebAPI

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>("getHero"))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>("getHeroes", []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  // 型パラメータを用いて呼び出し元のメソッドが期待する型を返却する
  private handleError<T>(operation = "oparation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力
      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);
      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
