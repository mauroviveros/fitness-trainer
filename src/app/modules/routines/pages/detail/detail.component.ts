import { Component } from "@angular/core";

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
}
