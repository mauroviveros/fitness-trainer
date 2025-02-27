import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { NavigationService } from '@shared/services/navigation.service';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule
];

@Component({
  selector: 'home-wrapper',
  imports: [RouterLink, MATERIAL_MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly navigation = inject(NavigationService);
  readonly shortcuts = this.navigation.routes.filter(
    ({ shortcut }) => shortcut
  );
}
