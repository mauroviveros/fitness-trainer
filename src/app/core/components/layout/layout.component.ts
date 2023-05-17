import { Component, OnInit, inject } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
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
  private router = inject(Router);
  expand = true;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart){
        this.expand = false;
        setTimeout(() => { this.expand = true; }, 100);
      }
    });
  }
}
