import { Component } from "@angular/core";
import { TokenService } from "../../services/token.service";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-token-validator",
  templateUrl: "./token-validator.component.html",
  styleUrls: ["./token-validator.component.scss"]
})
export class TokenValidatorComponent {
  form: FormGroup = this.formBuilder.group({
    token: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private token: TokenService
  ){}

  submit(form: FormGroupDirective){
    console.log("submit");
    if(this.form.invalid) return;
    if(!this.form.value.token) return;
    const token = this.form.value.token;
    this.form.reset();
    form.resetForm();

    this.token.set(token).then(response => {
      console.log(response);
      
      this.router.navigate(["/"]);
    });
  }
}
