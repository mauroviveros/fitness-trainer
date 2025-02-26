import { Routes } from '@angular/router';
import { ExercisesComponent } from './exercises.component';

export const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
    data: {
      navigation: {
        title: 'Exercises',
        icon: 'fitness_center',
        shortcut: true
      }
    }
  }
];
