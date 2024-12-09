import { Routes } from '@angular/router';
import { AuthWrapperComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    children: [{ path: 'login', component: LoginComponent }]
  }
];
