import { Pipe, PipeTransform } from "@angular/core";
import { UserDoc } from "../interfaces/user";

@Pipe({
  name: "user"
})
export class UserPipe implements PipeTransform {

  transform(user: UserDoc | null): string {
    return user ? `${user.name} ${user.surname}` : "";
  }

}
