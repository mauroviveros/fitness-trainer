import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserDocument } from "src/app/modules/users/interfaces/users";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UsersService } from "src/app/modules/users/services/users.service";

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
  public user: UserDocument = {} as UserDocument;
  public shortcuts: Shortcut[] = [
    { text: "Usuarios", icon: "people", link: "/users" },
    { text: "Mi rutina", icon: "fitness_center", link: "/rutina" },
    { text: "Mi nutrición", disabled: true },
    { text: "Calorias", disabled: true },
    { text: "Salir", action: "logout", icon: "logout" }
  ];

  public get saludo(){
    const hour = new Date().getHours();
    if(hour >= 6 && hour < 12) return "Buen dia!";
    else if(hour >= 12 && hour < 18) return "Buenas Tardes!";
    else return "Buenas Noches!";
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private usersService: UsersService
  ){
    this.usersService.user.subscribe(user => {
      this.user = user;
    });
  }

  public onClick(action?: string){
    if(!action) return;

    switch(action){
    case "logout": this.auth.logout().then(() => this.router.navigate(["/login"])); break;

    }
  }
}
