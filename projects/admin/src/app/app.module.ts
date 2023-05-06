import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';

const firebase = {
  projectId         : FIREBASE.PROJECT_ID,
  appId             : FIREBASE.APP_ID,
  storageBucket     : FIREBASE.STORAGE_BUCKET,
  apiKey            : FIREBASE.API_KEY,
  authDomain        : FIREBASE.AUTH_DOMAIN,
  messagingSenderId : FIREBASE.MESSAGING_SENDER_ID,
  measurementId     : FIREBASE.MEASUREMENT_ID
};

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    provideFirebaseApp(() => initializeApp(firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
