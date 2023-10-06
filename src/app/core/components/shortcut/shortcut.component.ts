import { Component, Input, inject } from "@angular/core";
import { Shortcut } from "src/app/shared/interfaces/shortcut";
import { AuthService } from "../../modules/auth/services/auth.service";

@Component({
  selector: "core-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.scss"]
})
export class ShortcutComponent {
  private readonly auth = inject(AuthService);

  @Input() public shortcut!: Shortcut;

  action(ID:string){
    if(ID === "logout") this.auth.logout();
  }
}
