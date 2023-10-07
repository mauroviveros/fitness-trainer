import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MediaService {
  private readonly breakpoint = inject(BreakpointObserver);


  $isMobile = this.breakpoint.observe("(max-width: 600px)").pipe(map(state => state.matches));
}
