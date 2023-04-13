import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { NewUserComponent } from "../../components/new-user/new-user.component";
import { UsersService } from "../../services/users.service";
import { Role, UserDocument } from "../../interfaces/users";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  public users: UserDocument[] = [];

  constructor(
    private _dialog: MatDialog,
    private usersService: UsersService
  ){
    this.usersService.getUsers().subscribe(users => {
      this.users = users as UserDocument[];
    });
  }

  public getIconByRol(role: Role){
    switch(role){
    case "USER": return "person";
    case "ADMIN": return "supervised_user_circle";
    case "OWNER": return "engineering";
    }
  }

  public addUser(){
    this._dialog.open(NewUserComponent);
  }
}
