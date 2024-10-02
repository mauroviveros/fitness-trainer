import { Component } from '@angular/core';
import { AuthFormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {}
