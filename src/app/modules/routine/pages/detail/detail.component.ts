import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { RoutineUtilsService } from "../../services/routine-utils.service";
import { ActivatedRoute } from "@angular/router";
import { RoutineService } from "../../services/routine.service";
import { Subscription, combineLatest } from "rxjs";
import { UserService } from "src/app/core/modules/auth/services/user.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly routineUtils = inject(RoutineUtilsService);
  private readonly routine = inject(RoutineService);
  private readonly route = inject(ActivatedRoute);
  private readonly user  = inject(UserService);
  readonly form = this.routineUtils.createForm();
  private subscription?: Subscription;

  canComplete = false;
  isLoading = false;
  isSaving = false;

  ngOnInit(){
    this.subscription = this.initRoutine();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initRoutine(){
    this.isLoading = true;
    return combineLatest([this.routine.get(this.route.snapshot.params["_id"]), this.user.$data]).subscribe(([routine, user]) => {
      Object.keys(this.form.controls).forEach(controlName => {
        let value = routine[controlName];
        if(controlName === "customer") value = routine.customer._id;
        this.form.controls[controlName].setValue(value);
        this.form.controls[controlName].disable();
      });

      this.canComplete = this.route.snapshot.data["canComplete"] && routine.customer._id === user?._id;
      this.isLoading = false;
    });
  }
}
