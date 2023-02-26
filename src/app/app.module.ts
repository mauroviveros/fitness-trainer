import { initializeApp,provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    provideFirebaseApp(() => initializeApp(firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
