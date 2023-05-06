import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

import { ActionSheet } from "src/app/shared/interfaces/interface";

interface Action{
  _id: ActionSheet,
  icon: string,
  text: string
}

interface Data{
  hide:{
    create: boolean,
    update: boolean,
    read  : boolean,
    delete: boolean
  }
}

@Component({
  selector: "app-actions-sheet",
  templateUrl: "./actions-sheet.component.html"
})
export class ActionsSheetComponent implements OnInit {
  actions: Action[] = [];
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: Data,
    private bottomSheetRef: MatBottomSheetRef<ActionsSheetComponent>
  ){}

  ngOnInit(){
    if(!this.data.hide.create) this.actions.push({ _id: "create", icon: "post_add", text: "crear rutina" });
    if(!this.data.hide.update) this.actions.push({ _id: "update", icon: "edit", text: "actualizar rutina" });
    if(!this.data.hide.read) this.actions.push({ _id: "read", icon: "preview", text: "visualizar rutina" });
    if(!this.data.hide.delete) this.actions.push({ _id: "delete", icon: "delete", text: "borrar rutina" });
  }

  onAction(action: ActionSheet){
    this.bottomSheetRef.dismiss(action);
  }
}