import { Injectable, inject } from "@angular/core";
import { Shortcut } from "../interfaces/shortcut";
import { UserService } from "src/app/core/modules/auth/services/user.service";
import { UserDoc } from "../interfaces/user";
import { map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShortcutsService {
  private readonly user = inject(UserService);

  private readonly SHORTCUTS: Shortcut[] = [
    { _id: "home", icon: "home", label: "Inicio", link: "/" },
    { _id: "exercises", icon: "fitness_center", label: "ejercicios", link: "/exercises", admin: true },
    { _id: "customers", icon: "people", label: "clientes", link: "/customers", admin: true },
    { _id: "profile", icon: "manage_accounts", label: "mis datos", link: "/profile" },
    { _id: "logout", icon: "logout", label: "cerrar sesión" }
  ];

  get shortcuts(){
    return this.SHORTCUTS;
  }
  $shortcuts = this.user.$data.pipe(
    map(user => user._admin),
    map(isAdmin => this.SHORTCUTS.filter(shortcut => shortcut.admin ? isAdmin : true))
  );
}
