import { Routes } from '@angular/router';

import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Fitness Trainer | Identifícate',
    component: LoginComponent,
    data: {
      wrapper: {
        title: 'Iniciar sesión',
        footer: {
          text: '¿No tienes cuenta?',
          link: {
            route: '/register',
            label: 'Regístrate aquí',
          },
        },
      },
    },
  },
  {
    path: 'register',
    title: 'Fitness Trainer | Crea tu cuenta',
    component: RegisterComponent,
    data: {
      wrapper: {
        title: 'Registro',
        footer: {
          text: '¿Ya tienes una cuenta?',
          link: {
            route: '/login',
            label: 'Inicia sesión aquí',
          },
        },
      },
    },
  },
];
