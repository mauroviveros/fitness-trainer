import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthWrapperComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    children: [{ path: 'login', component: LoginComponent }]
  }
];
