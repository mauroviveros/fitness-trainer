import { Component, inject } from "@angular/core";
import { map } from "rxjs";

import { UserService } from "../../modules/auth/services/user.service";
import { ShortcutsService } from "src/app/shared/services/shortcuts.service";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  private readonly user = inject(UserService);
  private readonly shortcuts = inject(ShortcutsService);

  readonly $user = this.user.$data;
  readonly $shortcuts = this.shortcuts.$shortcuts.pipe(
    map(shortcuts => shortcuts.filter(shortcut => shortcut._id !== "home"))
  );
}
