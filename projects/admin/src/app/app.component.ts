import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  form: FormGroup = this.formBuilder.group({
    uid: ["", [Validators.required]]
  });


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private token: TokenService
  ){}

  submit(form: FormGroupDirective){
    if(this.form.invalid) return;
    if(!this.form.value.uid) return;
    const uid = this.form.value.uid;
    this.token.set(uid).then(({token, expirationDate}) => {
      this.form.reset();
      form.resetForm();
      this.dialog.open(DialogComponent, { data: { token, expirationDate, docRef: `tokens/${uid}` } });
    })
  }
}
