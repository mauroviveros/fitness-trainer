import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, combineLatest, filter, map } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";
import { RoutineService } from "src/app/modules/routine/services/routine.service";

import { Shortcut } from "../interfaces/shortcut";
import { Routine } from "../interfaces/routine";

@Injectable({
  providedIn: "root"
})
export class ShortcutsService {
  private readonly user = inject(UserService);
  private readonly routine = inject(RoutineService);

  private readonly subject = new BehaviorSubject<Shortcut[] | undefined>(undefined);
  private readonly SHORTCUTS: Shortcut[] = [
    { _id: "home", icon: "home", label: "Inicio", link: "/" },
    { _id: "routine", icon: "accessibility", label: "Mi rutina", link: "/routine" },
    { _id: "customers", icon: "people", label: "clientes", link: "/customers", admin: true },
    { _id: "exercises", icon: "fitness_center", label: "ejercicios", link: "/exercises", admin: true },
    { _id: "profile", icon: "manage_accounts", label: "mis datos", link: "/profile" },
    { _id: "logout", icon: "logout", label: "cerrar sesión" }
  ];

  readonly $shortcuts = this.subject.asObservable().pipe(
    filter(shortcuts => !!shortcuts),
    map(shortcuts => shortcuts as Shortcut[])
  );

  constructor(){
    combineLatest([this.user.$data, this.routine.getOwn()]).pipe(
      map(([user, routines]) => [user._admin, routines.filter(routine => new Date() >= routine.dateIN && new Date() <= routine.dateOUT)] as [boolean, Routine[]]),
      map(([isAdmin, routines]) => this.SHORTCUTS.filter(shortcut => shortcut._id === "routine" && !routines.length ? false : shortcut.admin ? isAdmin : true))
    ).subscribe(shortcuts => {
      this.subject.next(shortcuts);
    });
  }

}
