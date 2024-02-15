import { Component, Input, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

interface wrapper {
  title: string;
  footer: {
    text: string;
    link: {
      label: string;
      route: string | string[] | null | undefined;
    };
  };
}

@Component({
  selector: 'auth-wrapper',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent {
  @Input() isLoading: boolean = false;
  private readonly route = inject(ActivatedRoute);
  readonly wrapper: wrapper = this.route.snapshot.data['wrapper'];
}
