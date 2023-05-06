import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-detail-dialog",
  templateUrl: "./detail-dialog.component.html",
  styleUrls: ["./detail-dialog.component.scss"]
})
export class DetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public description: string
  ){}
}
