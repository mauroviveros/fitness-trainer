import { Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { LoginComponent } from '@auth/login/login.component';
import { RegisterComponent } from '@auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

import { routes as routesCustomers } from './modules/customers/customers.routes';
import { routes as routesExercises } from './modules/exercises/exercises.routes';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { navigation: { title: 'home', icon: 'home' } }
      },
      { path: 'customers', children: routesCustomers },
      { path: 'exercises', children: routesExercises }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
