import { Component, Input } from "@angular/core";

@Component({
  selector: "shared-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  @Input() public text = "";
  @Input() public isLoading = true;
}
