import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "auth-password-form-field",
  templateUrl: "./password-form-field.component.html",
  styleUrls: ["./password-form-field.component.scss"]
})
export class PasswordFormFieldComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() name!: string;
  @Input() label?: string;
  visiblity = false;

  get icon(){ return this.visiblity ? "visibility_off" : "visibility"; }
  get type(){ return this.visiblity ? "text" : "password"; }

  ngOnInit(){
    if(!this.group){ console.error(new Error("Missing FormGroup")); }
  }

  toggle(event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.visiblity = !this.visiblity;
  }
}
