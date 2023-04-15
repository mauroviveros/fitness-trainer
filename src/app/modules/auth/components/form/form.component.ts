import { Component, Input } from "@angular/core";

@Component({
  selector: "auth-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent{
  @Input() public isLoading = false;
  @Input() public text?: string;
}
