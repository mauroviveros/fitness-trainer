import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'auth-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPasswordComponent {
  @Input() control = new FormControl('');
  @Input() label = 'Contraseña';
  @Input() placeholder = 'Ingrese su contraseña';
  @Input() autocomplete = 'new-password';

  private hide = true;

  get type() {
    return this.hide ? 'password' : 'text';
  }

  get icon() {
    return this.hide ? 'visibility' : 'visibility_off';
  }

  toggle(event: MouseEvent) {
    event.stopPropagation();
    this.hide = !this.hide;
  }
}
