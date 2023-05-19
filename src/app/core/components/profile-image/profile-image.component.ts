import { Component, inject } from "@angular/core";
import { ProfileImageService } from "../../services/profile-image.service";
import { tap } from "rxjs";

@Component({
  selector: "core-profile-image",
  templateUrl: "./profile-image.component.html",
  styleUrls: ["./profile-image.component.scss"]
})
export class ProfileImageComponent {
  private readonly profileImage = inject(ProfileImageService);
  isLoading = true;

  $src = this.profileImage.$src.pipe(tap(() => this.isLoading = true));

  onLoad(){ this.isLoading = false; }
}
