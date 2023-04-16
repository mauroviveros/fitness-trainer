import { Component, Input } from "@angular/core";

@Component({
  selector: "auth-wrapper",
  templateUrl: "./wrapper.component.html",
  styleUrls: ["./wrapper.component.scss"]
})
export class WrapperComponent{
  @Input() public isLoading = false;
  @Input() public text?: string;
}
