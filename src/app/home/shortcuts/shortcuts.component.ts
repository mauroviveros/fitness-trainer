import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemComponent } from './item/item.component';
import { NavigationService } from '@shared/services/navigation.service';

const MATERIAL_MODULES = [MatCardModule, MatGridListModule];

@Component({
  selector: 'home-shortcuts',
  imports: [MATERIAL_MODULES, ItemComponent],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent {
  private readonly navigation = inject(NavigationService);
  readonly shortcuts = this.navigation.routes.filter(
    ({ shortcut }) => shortcut
  );
  readonly shortcut = this.shortcuts[0];
}
