import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

interface Layout{
  title: string
  footer?: {
    label: string
    button: string,
    link: string
  }
}
@Component({
  selector: "auth-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  private readonly route = inject(ActivatedRoute);
  layout: Layout = this.route.snapshot.data["layout"];
}
