import { Component } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute } from "@angular/router";
import { UserDocument } from "../../interfaces/user";


interface Detalle {
  icon: string,
  title: string,
  field: string
}

@Component({
  selector: "users-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent {
  public user: UserDocument = {} as UserDocument;

  public detalle: Detalle[] = [
    { icon: "dashboard", title: "email", field: "email" }
  ];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ){
    this.usersService.getUser(this.route.snapshot.params["_id"]).subscribe(user => {
      this.user = user;
    });
  }
}
