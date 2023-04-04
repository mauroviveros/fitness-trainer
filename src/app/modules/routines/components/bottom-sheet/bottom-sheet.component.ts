import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-bottom-sheet",
  templateUrl: "./bottom-sheet.component.html",
  styleUrls: ["./bottom-sheet.component.scss"]
})
export class BottomSheetComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef
  ){}

  public openVideo(){
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  }

  public finalizar(){
    this._bottomSheetRef.dismiss(true);
  }
}
