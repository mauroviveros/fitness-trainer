import { inject, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import type { Navigation } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router = inject(Router);
  readonly routes = this.getNavigation(this.router.config);

  private getNavigation(routes: Route[], parent?: string) {
    return routes.reduce((array, { path, data, children }) => {
      const navigation = data ? data['navigation'] : undefined;
      path = [parent, path].join(path ? '/' : '');

      if (navigation) array.push({ ...navigation, path });
      if (children) array.push(...this.getNavigation(children, path));

      return array;
    }, [] as Navigation[]);
  }
}
