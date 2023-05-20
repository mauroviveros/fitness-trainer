import { Injectable, inject } from "@angular/core";
import { UserService } from "../modules/auth/services/user.service";

@Injectable({
  providedIn: "root"
})
export class ProfileResolver {
  private readonly user = inject(UserService);

  resolve(){
    return this.user.$data;
  }
}
