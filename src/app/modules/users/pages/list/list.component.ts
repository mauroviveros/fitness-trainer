import { Component } from "@angular/core";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {

  constructor(
    private _usersService: UsersService
  ){}

  public addUser(){
    this._usersService.createUser("test1@test.com");
  }
}
