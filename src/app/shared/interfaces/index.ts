import { Route } from '@angular/router';
export * from './exercise';

export interface Navigation {
  path: Route['path'];
  icon?: string;
  title?: string;
  shortcut?: boolean;
}
