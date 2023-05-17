import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription, filter, map } from "rxjs";

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private subscription?: Subscription;
  layout?: Layout;

  ngOnInit(){
    this.setLayout();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private setLayout(){
    const getData = () => this.route.firstChild?.snapshot.data as Layout;

    this.layout = getData();
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => getData())
    ).subscribe(data => {
      this.layout = data;
    });
  }
}