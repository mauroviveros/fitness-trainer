import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ItemComponent } from './item/item.component';

const MATERIAL_MODULES = [MatCardModule, MatGridListModule];

@Component({
  selector: 'home-shortcuts',
  imports: [MATERIAL_MODULES, ItemComponent],
  templateUrl: './shortcuts.component.html',
  styleUrl: './shortcuts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutsComponent {}
