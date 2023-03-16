import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
  styles: [`:host{ display: flex; flex: 1; flex-direction: column; } `],
})
export class AppComponent {}
