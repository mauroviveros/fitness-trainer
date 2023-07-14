import { Component, Input, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { CustomerService } from "src/app/modules/customer/services/customer.service";
import { DateUtilsService } from "src/app/shared/services/date-utils.service";

@Component({
  selector: "routine-detail-form",
  templateUrl: "./detail-form.component.html",
  styleUrls: ["./detail-form.component.scss"]
})
export class DetailFormComponent {
  private readonly customer = inject(CustomerService);
  readonly dateUtils = inject(DateUtilsService);
  readonly levels = ["BAJA", "MEDIA", "INTENSA", "MUY INTENSA"];
  readonly $customers = this.customer.$list;
  @Input() form!: FormGroup;

  get chips(){
    return this.dateUtils.getDays(this.form.controls["daysOfWeek"].value);
  }


  highlightSelected: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const ctrlValue = this.form.controls["daysOfWeek"].value;
    if(view !== "month" || !ctrlValue) return "";
    const date = cellDate.getDay();
    return ctrlValue.includes(date) ? "day_selected" : "";
  };

  onRemovedChip(indexRemoved: number){
    const ctrl = this.form.controls["daysOfWeek"];
    const value = ctrl.value.filter((_: number, i: number) => i !== indexRemoved);
    ctrl.setValue(value);
  }
}
