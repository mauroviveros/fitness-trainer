import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';

@Component({
  selector: 'home-wrapper',
  imports: [ShortcutsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly auth = inject(AuthService);

  logout() {
    return this.auth.signOut();
  }
}
