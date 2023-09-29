import { Injectable, inject } from "@angular/core";

import { AuthService } from "../modules/auth/services/auth.service";
import { Shortcut } from "src/app/shared/interfaces/shortcut";
import { RoutineService } from "src/app/modules/routine/services/routine.service";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  private readonly auth = inject(AuthService);
  private readonly routine = inject(RoutineService);

  readonly menu: Shortcut[] = [
    { _id: "home", icon: "home", label: "inicio", link: "" },
    { _id: "customer", icon: "people", label: "clientes", link: "/customers", admin: true },
    { _id: "exercise", icon: "fitness_center", label: "ejercicios", link: "/exercises", admin: true },
    { _id: "profile", icon: "manage_accounts", label: "mis datos", link: "/profile", admin: true },
    { _id: "logout", icon: "logout", label: "cerrar sesión" }
  ];

  constructor(){
    this.routine.getOwn().subscribe(() => {
      this.menu.splice(1, 0, { _id: "routine", icon: "fitness_center", label: "mi rutina", link: "/routine" });
    });
  }

  
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
