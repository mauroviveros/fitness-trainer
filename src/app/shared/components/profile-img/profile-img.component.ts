import { Component } from "@angular/core";
import { tap } from "rxjs";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "shared-profile-img",
  templateUrl: "./profile-img.component.html",
  styleUrls: ["./profile-img.component.scss"]
})
export class ProfileImgComponent {
  isLoading = true;
  isUpdated = false;

  constructor(
    private profileService: ProfileService
  ){}

  imageURL  = this.profileService.imageURL.pipe(
    tap(() => this.isUpdated = true)
  );

  onLoad(){
    this.isUpdated = false;
    this.isLoading = false;
  }
}
