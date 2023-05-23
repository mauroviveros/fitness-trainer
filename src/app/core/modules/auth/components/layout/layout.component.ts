import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

interface Footer{
  label: string
  button: string,
  link: string
}
interface Layout{
  title: string
  footer?: Footer
}

@Component({
  selector: "auth-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private subscription?: Subscription;
  layout?: Layout;

  ngOnInit(){
    this.subscription = this.initLayout();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initLayout(){
    return this.route.data.subscribe(({ layout }) => {
      this.layout = layout;
    });
  }
}