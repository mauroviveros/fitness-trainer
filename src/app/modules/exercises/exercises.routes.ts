import { ExercisesComponent } from './exercises.component';
import { Routes } from '@angular/router';

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
