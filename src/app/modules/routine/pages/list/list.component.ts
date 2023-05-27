import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "routine-list",
  templateUrl: "./list.component.html"
})
export class ListComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  create(){ this.router.navigate(["create"], { relativeTo: this.route }); }
}