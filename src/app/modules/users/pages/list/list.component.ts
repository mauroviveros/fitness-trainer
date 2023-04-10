import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { NewUserComponent } from "../../components/new-user/new-user.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {

  constructor(
    private _dialog: MatDialog,
  ){}

  public addUser(){
    this._dialog.open(NewUserComponent);

  }
}
