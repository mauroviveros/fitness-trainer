import { Component, HostBinding } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "core-splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [ style({ opacity: 0 }), animate("100ms", style({ opacity: 1 })) ]),
      transition(":leave", [ animate("500ms", style({ opacity: 0 }))])
    ])
  ]
})
export class SplashScreenComponent {
  @HostBinding("@fade") fade = undefined;
}
