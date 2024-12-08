import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  simulateHTTP<T>(time: number = 1000, data?: T) {
    return of(data).pipe(delay(time));
  }
}
