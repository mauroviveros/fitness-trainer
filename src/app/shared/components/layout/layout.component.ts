import { Component, Input, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "shared-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  private readonly route = inject(ActivatedRoute);
  readonly mode: 1 | 2 | 3 | undefined = this.route.snapshot.data["mode"];
  @Input() loadingDM = false;
  @Input() loading = false;
  @Input() text?: string;
}
