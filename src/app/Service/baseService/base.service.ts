import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private router: Router) {}

  generateAutoIncrementId(obj: any): number {
    let newId;
    if (obj.length == 0) {
      return (newId = 1);
    } else {
      let array2 = obj.sort((a: any, b: any) => a.id - b.id);
      array2 = array2.reverse();
      let oldId = array2[0].id;

      newId = oldId + 1;

      return newId;
    }
  }

  setTheme(): void {
    let themeStorageKey = 'DarkMode';
    let theme = localStorage.getItem(themeStorageKey);
    if (theme === null) {
      localStorage.setItem(themeStorageKey, 'light');
    }
  }

  setActiveRoute(): void {
    let StorageKey = 'A.R';
    localStorage.setItem(StorageKey, this.router.url);
  }

  getRecentActiveRoute(): string {
    let StorageKey = 'A.R';
    return JSON.stringify(localStorage.getItem(StorageKey));
  }
}
