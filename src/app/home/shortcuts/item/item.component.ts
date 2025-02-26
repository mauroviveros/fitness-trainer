import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Navigation } from '@shared/interfaces';

const MATERIAL_MODULES = [MatButtonModule, MatIconModule];

@Component({
  selector: 'home-shortcuts-item',
  imports: [RouterLink, MATERIAL_MODULES],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  readonly shortcut = input.required<Navigation>();
}
