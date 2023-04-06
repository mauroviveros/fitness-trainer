import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatBottomSheet } from "@angular/material/bottom-sheet";

import { NewUserComponent } from "../../components/new-user/new-user.component";
import { BottomSheetComponent } from "../../components/bottom-sheet/bottom-sheet.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {

  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ){}

  public addUser(){
    const bool = true;
    if(bool){
      this._bottomSheet.open(BottomSheetComponent);
    } else{
      this._dialog.open(NewUserComponent);
    }

  }
}
