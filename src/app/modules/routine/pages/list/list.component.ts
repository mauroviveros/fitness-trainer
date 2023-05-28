import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutineService } from "../../services/routine.service";
import { Subscription } from "rxjs";
import { Routine } from "src/app/shared/interfaces/routine";

@Component({
  selector: "routine-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly routine = inject(RoutineService);
  subscription?: Subscription;
  isLoading = false;
  list: Routine[] = [];


  ngOnInit(){
    this.subscription = this.initList();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initList(){
    this.isLoading = true;
    return this.routine.$list.subscribe(routines => {
      this.isLoading = false;
      this.list = routines;
    });
  }

  create(){ this.router.navigate(["create"], { relativeTo: this.route }); }
}