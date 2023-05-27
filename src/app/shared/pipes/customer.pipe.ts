import { Pipe, PipeTransform } from "@angular/core";
import { UserDoc } from "../interfaces/user";

@Pipe({
  name: "customer"
})
export class CustomerPipe implements PipeTransform {

  transform(customer: UserDoc): string {
    return `${customer.name} ${customer.surname}`;
  }

}
