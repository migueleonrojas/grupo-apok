import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = signal('es');

  setLanguage(lang: string) {
    this.currentLang.set(lang);
  }

  getLanguage(): string {
    return this.currentLang();
  }
}
