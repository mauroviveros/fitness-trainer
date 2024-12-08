import { Component } from '@angular/core';
import { CoreModule } from '../../core.module';

@Component({
  selector: 'core-home',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
