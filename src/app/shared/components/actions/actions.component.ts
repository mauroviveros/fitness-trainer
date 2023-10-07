import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ActionsSheetComponent } from "../actions-sheet/actions-sheet.component";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Action } from "../../interfaces/interfaces";
import { map } from "rxjs";



@Component({
  selector: "shared-actions",
  templateUrl: "./actions.component.html"
})
export class ActionsComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly breakpoint = inject(BreakpointObserver);
  @Output() action = new EventEmitter<string>();
  @Input() actions: Action[] = [];

  $isMobile = this.breakpoint.observe("(max-width: 600px)").pipe(map(state => state.matches));

  select(action: Action){
    this.action.emit(action._id);
  }

  openBottomSheet(){
    this.bottomSheet.open(ActionsSheetComponent, { data: this.actions }).afterDismissed()
      .subscribe((action: Action) => this.action.emit(action._id));
  }
}
