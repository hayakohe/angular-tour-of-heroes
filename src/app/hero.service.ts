import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

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
    const hero = HEROES.find(h => h.id === id)!;
    this.log(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
