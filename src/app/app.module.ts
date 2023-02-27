import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app.routing";
import { MaterialModule } from "./modules/material.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";

const firebase = {
  projectId         : environment.FIREBASE.PROJECT_ID,
  appId             : environment.FIREBASE.APP_ID,
  // databaseURL       : environment.FIREBASE.DATABASE_URL,
  storageBucket     : environment.FIREBASE.STORAGE_BUCKET,
  apiKey            : environment.FIREBASE.API_KEY,
  authDomain        : environment.FIREBASE.AUTH_DOMAIN,
  messagingSenderId : environment.FIREBASE.MESSAGING_SENDER_ID,
  measurementId     : environment.FIREBASE.MEASUREMENT_ID
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    // ScreenTrackingService,
    // UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
