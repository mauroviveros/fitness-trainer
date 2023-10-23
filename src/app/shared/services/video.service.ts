/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import { Injectable, inject } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  private readonly sanitizer = inject(DomSanitizer);
  readonly players = [
    {
      icon: "vimeo",
      regexp: /http(?:s?):\/\/(?:www\.)?(?:player\.)?vimeo\.com\/(\d+)(?:|\/\?)/,
      iframe: "https://player.vimeo.com/video/{ID}?autoplay=1"
    },
    {
      icon: "youtube",
      regexp: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/,
      iframe: "https://www.youtube.com/embed/{ID}?autoplay=1"
    }
  ];

  validate() : (control : AbstractControl) => ValidationErrors | null{
    return (control : AbstractControl) : ValidationErrors | null => {
      if(!control.value) return null;
      const isValid = this.players.some(player => player.regexp.test(control.value));
      return isValid ? null : { videoUrl: true };
    };
  }

  getIframeUrl(url: string) : SafeResourceUrl | null {
    const player = this.players.find(player => player.regexp.test(url));
    if(!player) return null;
    const match = url.match(player.regexp);
    if(!match) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(player.iframe.replace("{ID}", match[1]));
  }
}
