import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { NewUserComponent } from "../new-user/new-user.component";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./bottom-sheet.component.html",
  styleUrls: ["./bottom-sheet.component.scss"]
})
export class BottomSheetComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef,
    private _dialog: MatDialog
  ){}

  public addUser(role?: "ADMIN"){
    this._bottomSheetRef.dismiss();
    this._dialog.open(NewUserComponent, {
      data: { role }
    });
  }
}
