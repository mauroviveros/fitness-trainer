import { Route } from '@angular/router';

export interface Navigation {
  path: Route['path'];
  icon?: string;
  title?: string;
  shortcut?: boolean;
}
