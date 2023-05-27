import { Injectable, inject } from "@angular/core";

import { AuthService } from "../modules/auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  private readonly auth = inject(AuthService);

  readonly menu = [
    { _id: "home", icon: "home", label: "inicio", link: "" },
    { _id: "customer", icon: "people", label: "clientes", link: "/customers" },
    { _id: "routines", icon: "playlist_play", label: "rutinas", link: "/routines" },
    { _id: "exercise", icon: "fitness_center", label: "ejercicios", link: "/exercises" },
    { _id: "profile", icon: "manage_accounts", label: "mis datos", link: "/profile" },
    { _id: "logout", icon: "logout", label: "cerrar sesión" }
  ];

  get shortcut(){
    return this.menu.filter(menuItem => {
      return menuItem._id !== "home";
    });
  }

  onNavigation(_id: string){
    switch(_id){
      case "logout": this.auth.logout(); break;
    }
  }
}
