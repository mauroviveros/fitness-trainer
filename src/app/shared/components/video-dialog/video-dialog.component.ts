import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

interface VideoDialogContent{
  title: string
  url: string
}

const converters = [
  {
    web: "https://vimeo.com",
    iframe: "https://player.vimeo.com/video",
    queryParams: "autoplay=1"
  }
];

@Component({
  selector: "shared-video-dialog",
  templateUrl: "./video-dialog.component.html",
  styleUrls: ["./video-dialog.component.scss"]
})
export class VideoDialogComponent {
  private readonly sanitizer = inject(DomSanitizer);
  iframeUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: VideoDialogContent){

    converters.forEach(converter => {
      if(this.data.url.includes(converter.web)){
        const id = this.data.url.split("/").at(-1)?.split("?")[0];
        this.data.url = `${converter.iframe}/${id}?${converter.queryParams}`;
      }
    });

    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  }
}
