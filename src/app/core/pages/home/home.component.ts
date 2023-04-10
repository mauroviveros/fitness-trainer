import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/auth/services/auth.service";

interface Shortcut{
  text: string,
  icon?: string,
  link?: string,
  action?: string,
  disabled?: boolean
}

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public shortcuts: Shortcut[] = [
    { text: "Usuarios", icon: "people", link: "/users" },
    { text: "Mi rutina", icon: "fitness_center", link: "/rutina" },
    { text: "Mi nutrición", disabled: true },
    { text: "Calorias", disabled: true },
    { text: "Salir", action: "logout", icon: "logout" }
  ];

  constructor(
    private _router: Router,
    private _auth: AuthService
  ){}

  public onClick(action?: string){
    if(!action) return;

    switch(action){
    case "logout": this._auth.logout().then(() => this._router.navigate(["/login"])); break;

    }
  }
}
