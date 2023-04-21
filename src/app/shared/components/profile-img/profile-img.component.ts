import { Component, OnDestroy } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "shared-profile-img",
  templateUrl: "./profile-img.component.html",
  styleUrls: ["./profile-img.component.scss"]
})
export class ProfileImgComponent implements OnDestroy{
  subscription? : Subscription;
  isLoading = true;
  imgURL? : string;

  constructor(
    private profileService: ProfileService
  ){
    this.subscription = this.profileService.imageURL.pipe(
      tap(url => this.isLoading = !!url)
    ).subscribe(url => {
      this.imgURL = url;
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  onLoad(){ this.isLoading = false; }
}
