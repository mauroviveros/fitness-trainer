import { Component, EventEmitter, Output, inject } from "@angular/core";
import { ProfileImageService } from "../../services/profile-image.service";

@Component({
  selector: "core-image-upload",
  templateUrl: "./image-upload.component.html"
})
export class ImageUploadComponent {
  private readonly profileImage = inject(ProfileImageService);
  @Output() private upload = new EventEmitter<string>();
  accept = [".png", ".jpeg", ".jpg"];

  uploadIMG(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    if(!element.files) return;

    const file = element.files[0];
    this.profileImage.upload(file).then(response => {
      this.upload.emit(response);
    });
  }
}
