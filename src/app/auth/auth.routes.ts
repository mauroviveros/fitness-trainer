import { Routes } from '@angular/router';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: SignInFormComponent,
  },
  {
    path: 'register',
    component: SignUpFormComponent,
  },
];
