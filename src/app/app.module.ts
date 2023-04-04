import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app.routing";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/pages/home/home.component";
import { ShortcutComponent } from "./core/components/shortcut/shortcut.component";

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
    HomeComponent,
    ShortcutComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    // ScreenTrackingService,
    // UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
