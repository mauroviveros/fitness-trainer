import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL_MODULES = [MatButtonModule, MatIconModule];

@Component({
  selector: 'home-shortcuts-item',
  imports: [MATERIAL_MODULES],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {}
