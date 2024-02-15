import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  simulateHTTP<T>(time: number, data?: T) {
    return of(data).pipe(delay(time));
  }
}
