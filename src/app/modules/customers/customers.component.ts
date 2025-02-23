import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'customers-list',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {}
