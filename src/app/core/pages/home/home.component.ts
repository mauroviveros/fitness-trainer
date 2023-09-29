import { Component, OnInit, inject } from "@angular/core";
import { tap } from "rxjs";

import { UserService } from "../../modules/auth/services/user.service";
import { NavigationService } from "../../services/navigation.service";

import { UserDoc } from "src/app/shared/interfaces/user";
import { Shortcut } from "src/app/shared/interfaces/shortcut";

@Component({
  selector: "core-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private readonly user = inject(UserService);
  readonly navigation = inject(NavigationService);
  isLoading = true;
  data?: UserDoc | null;

  ngOnInit(){
    this.user.$data.pipe(
      tap(() => this.isLoading = true),
    ).subscribe(data => {
      this.isLoading = false;
      this.data = data;
    });
  }


  canSee(shortcut: Shortcut){
    if(shortcut.admin) return this.data?._admin;
    return true;
  }
}