import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output
} from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

const MATERIAL_MODULES = [MatIconModule, MatListModule];

@Component({
  selector: 'layout-navigation',
  imports: [RouterLink, MATERIAL_MODULES],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  readonly routes = inject(NavigationService).routes;
  readonly selected = output<void>();
}
