import { CustomersComponent } from './customers.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    data: {
      navigation: {
        title: 'Customers',
        icon: 'people',
        shortcut: true
      }
    }
  }
];
