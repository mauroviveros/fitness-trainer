import { Component, OnInit, inject } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "core-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  animations: [
    trigger("expand", [
      state("true", style({ "max-height": "100vh" })),
      state("false", style({ "max-height": "0" })),
      transition("false => true", animate("300ms"))
    ])
  ]
})
export class LayoutComponent implements OnInit {
  private readonly router = inject(Router);
  expand = true;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.expand = false;
        setTimeout(() => { this.expand = true; }, 100);
      }
    });
  }
}
