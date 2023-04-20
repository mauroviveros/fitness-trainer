import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth,getAuth } from "@angular/fire/auth";
import { provideFirestore,getFirestore } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app.routing";
import { SharedModule } from "./shared/shared.module";

import { FIREBASE } from "../environments/environment";

import { AppComponent } from "./app.component";
import { ShortcutComponent } from "./core/components/shortcut/shortcut.component";
import { SplashScreenComponent } from "./core/components/splash-screen/splash-screen.component";

import { HomeComponent } from "./core/pages/home/home.component";
import { ProfileComponent } from "./core/pages/profile/profile.component";
import { WelcomeDialogComponent } from "./core/components/welcome-dialog/welcome-dialog.component";


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
    HomeComponent,
    ProfileComponent,
    ShortcutComponent,
    SplashScreenComponent,
    WelcomeDialogComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
