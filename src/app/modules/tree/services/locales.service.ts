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

  getLocales(): Observable<Locale[]> {
    return this.httpClient.get<Locale[]>(`${environment.url}/locales`);
  }
}
