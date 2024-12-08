<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
=======
import { ApplicationConfig } from '@angular/core';
>>>>>>> refactor/angular17
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
=======
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1500 } },
>>>>>>> refactor/angular17
  ],
};
