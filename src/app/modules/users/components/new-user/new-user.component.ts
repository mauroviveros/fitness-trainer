import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface DialogData {
  role: string
}

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"]
})
export class NewUserComponent {
  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]]
  });
  
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
    console.log(this.data);
  }

  OnInit(){
    console.log(this.data);
  }
}
