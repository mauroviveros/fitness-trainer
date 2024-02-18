import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CoreModule } from '../../core.module';

@Component({
  selector: 'core-profile',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
