import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const MATERIAL_MODULES = [MatIconModule, MatListModule];

@Component({
  selector: 'layout-navigation',
  imports: [MATERIAL_MODULES],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  readonly routes = inject(NavigationService).routes;
}
