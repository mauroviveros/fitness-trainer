import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/modules/auth/services/auth.service";
import { UserService } from "src/app/modules/auth/services/user.service";

import { UserDocument } from "src/app/modules/auth/interfaces/user";
import { ProfileService } from "../../services/profile.service";

interface Shortcut{
  text: string,
  icon?: string,
  link?: string,
  action?: string,
  disabled?: boolean,
  admin?: boolean
}

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public user: UserDocument = {} as UserDocument;
  public shortcuts: Shortcut[] = [
    { text: "Clientes", icon: "people", link: "/customers", admin: true },
    { text: "Ejercicios", icon: "fitness_center", link: "/exercises", admin: true },
    { text: "Perfil", icon: "manage_accounts", link: "/profile" },
    { text: "Salir", action: "logout", icon: "logout" }
  ];

  public get saludo(){
    const hour = new Date().getHours();
    if(hour >= 6 && hour < 12) return "Buen dia!";
    else if(hour >= 12 && hour < 18) return "Buenas Tardes!";
    else return "Buenas Noches!";
  }

  imageURL  = this.profileService.imageURL;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private profileService: ProfileService
  ){
    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  public click(action?: string){
    if(!action) return;

    switch(action){
    case "logout": this.auth.logout().then(() => this.router.navigate(["/login"])); break;
    }
  }
}
