import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { filter } from "rxjs";

import { MediaService } from "../../services/media.service";

import { ActionsSheetComponent } from "../actions-sheet/actions-sheet.component";

import { Action } from "../../interfaces/interfaces";

@Component({
  selector: "shared-actions",
  templateUrl: "./actions.component.html"
})
export class ActionsComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly media = inject(MediaService);

  @Output() action = new EventEmitter<string>();
  @Input() actions: Action[] = [];

  $isMobile = this.media.$isMobile;

  select(action: Action){
    this.action.emit(action._id);
  }

  openBottomSheet(){
    this.bottomSheet.open(ActionsSheetComponent, { data: this.actions }).afterDismissed()
      .pipe(filter(action => !!action))
      .subscribe((action: Action) => this.action.emit(action._id));
  }
}
