import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DateUtilsService {
  readonly DAYS = [
    "DOMINGO",
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO"
  ];

  readonly MONTHS = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ];

  getDays(daysIndex: number[]){
    if(!daysIndex) daysIndex = [];
    return daysIndex.sort().map(index => {
      return this.DAYS[index];
    });
  }
}
