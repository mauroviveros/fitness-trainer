import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ExercisesService } from './exercises.service';
import { tap } from 'rxjs';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule
];
@Component({
  selector: 'ft-exercises',
  imports: [AsyncPipe, MATERIAL_MODULES],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent {
  private readonly exercises = inject(ExercisesService);
  exercises$ = this.exercises.collection$.pipe(tap(console.log));
}
