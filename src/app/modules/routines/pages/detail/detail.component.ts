import { Component } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatListOption } from "@angular/material/list";

import { BottomSheetComponent } from "../../components/bottom-sheet/bottom-sheet.component";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent {
  public detalle = [
    { icon: "today", title: "Fecha Inicio", value: "01/03/2023" },
    { icon: "event", title: "Fecha Fin", value: "01/04/2023" },
    { icon: "speed", title: "Nivel de actividad", value: "Muy intensa" },
    { icon: "science", title: "Kal. para el objetivo", value: "2200 kal" },
    { icon: "flag", title: "Objetivo", value: "Perdida de grasa" }
  ];

  constructor(
    private _bottomSheet: MatBottomSheet
  ){}

  public onSelectRutina(option:MatListOption){
    option.selected = false;
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((result) => {
      option.selected = result || false;
    });
  }
}
