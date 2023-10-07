import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SafeResourceUrl } from "@angular/platform-browser";
import { VideoService } from "../../services/video.service";

interface VideoDialogContent{
  title: string
  url: string
}

@Component({
  selector: "shared-video-dialog",
  templateUrl: "./video-dialog.component.html",
  styleUrls: ["./video-dialog.component.scss"]
})
export class VideoDialogComponent {
  private readonly video = inject(VideoService);
  iframeUrl? : SafeResourceUrl | null;
  title? : string;

  constructor(@Inject(MAT_DIALOG_DATA) data: VideoDialogContent){
    this.title = data.title;
    this.iframeUrl = this.video.getIframeUrl(data.url);
  }
}
