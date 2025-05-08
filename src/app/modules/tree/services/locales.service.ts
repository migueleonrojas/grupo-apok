import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Locale } from '../../../core/models/locales.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalesService {
  private httpClient = inject(HttpClient);

  /* private currentLocale = signal<Locale>({
    label: 'Español',
    locale: 'es_ES',
  });

  getCurrentLocale(): Signal<Locale> {
    return this.currentLocale.asReadonly();
  }

  setCurrentLocale(locale: Locale) {
    this.currentLocale.set(locale);
  } */

  getLocales(): Observable<Locale[]> {
    return this.httpClient.get<Locale[]>(`${environment.url}/locales`);
  }
}
