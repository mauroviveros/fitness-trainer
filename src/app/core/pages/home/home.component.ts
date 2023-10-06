import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { UserService } from "../../modules/auth/services/user.service";
import { UserDoc } from "src/app/shared/interfaces/user";
import { Shortcut } from "src/app/shared/interfaces/shortcut";
import { Subscription } from "rxjs";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly userSrv = inject(UserService);
  private subscription? : Subscription;
  user: UserDoc = {} as UserDoc;

  shortcuts: Shortcut[] = [
    { _id: "profile", icon: "manage_accounts", label: "mis datos", link: "/profile" },
    { _id: "logout", icon: "logout", label: "cerrar sesión" }
  ];

  ngOnInit(){
    this.subscription = this.userSrv.$data.subscribe(user => this.user = user);
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}
