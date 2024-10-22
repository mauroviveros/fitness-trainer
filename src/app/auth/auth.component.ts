import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatCardModule];

@Component({
  selector: 'auth-wrapper',
  standalone: true,
  imports: [MATERIAL_MODULES, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
