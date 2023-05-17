import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogContent } from "../../interfaces/dialog";

@Component({
  selector: "shared-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class DialogComponent {
  private dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogContent){}


  onAction(){
    this.dialogRef.close(this.data.action?._id);
  }
}
