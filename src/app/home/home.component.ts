import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'ft-home',
  imports: [],
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
