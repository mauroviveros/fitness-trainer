import { Pipe, PipeTransform } from "@angular/core";
import { Customer } from "../interfaces/customer";

@Pipe({
  name: "customer"
})
export class CustomerPipe implements PipeTransform {

  transform(customer: Customer): string {
    return `${customer.name} ${customer.surname}`;
  }

}
