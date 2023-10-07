import { Component, Input } from "@angular/core";
import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "routine-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent {
  @Input() customer? : UserDoc = {} as UserDoc;
  @Input() admin? : UserDoc = {} as UserDoc;
}
