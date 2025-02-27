import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationService } from '@shared/services/navigation.service';
import { AuthService } from '@auth/auth.service';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly routes = inject(NavigationService).routes;
  readonly isAuthenticated = inject(AuthService).isAuthenticated;
  title = 'fitness-trainer';
}
