import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@angular/fire/auth";

import * as moment from "moment";

import { AuthService } from "../../services/auth.service";
import { UserDocument } from "src/app/modules/users/interfaces/users";
import { UsersService } from "src/app/modules/users/services/users.service";

@Component({
  selector: "auth-unverified",
  templateUrl: "./unverified.component.html",
  styleUrls: ["./unverified.component.scss"]
})
export class UnverifiedComponent{
  public authUser: User = {} as User;
  public user: UserDocument = {} as UserDocument;

  public get canSendEmail(){
    if(!this.user.dateLastEmailVerification) return true;
    return moment().diff(moment(this.user.dateLastEmailVerification), "minutes") >= 5;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UsersService
  ){
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  public sendVerification(){
    this.auth.sendEmailVerification().then(() => this.userService.updateUser(this.user._id, { dateLastEmailVerification: new Date() }));
  }

  public logout(){
    this.auth.logout().then(() => this.router.navigate(["/login"]));
  }

}
