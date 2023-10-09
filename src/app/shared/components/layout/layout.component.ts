import { Component, Input, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ShortcutsService } from "../../services/shortcuts.service";
import { AuthService } from "src/app/core/modules/auth/services/auth.service";
import { UserService } from "src/app/core/modules/auth/services/user.service";

@Component({
  selector: "shared-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly user = inject(UserService);
  private readonly shortcutsSrv = inject(ShortcutsService);

  readonly mode: 1 | 2 | 3 | undefined = this.route.snapshot.data["mode"];
  @Input() loadingDM = false;
  @Input() loading = false;
  @Input() text?: string;

  readonly $shortcuts = this.shortcutsSrv.$shortcuts;
  readonly $user = this.user.$data;

  logout(){ this.auth.logout(); }
}
