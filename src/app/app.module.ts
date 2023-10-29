import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth,getAuth } from "@angular/fire/auth";
import { provideFirestore,getFirestore } from "@angular/fire/firestore";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";

import { FIREBASE } from "../environments/firebase";

import { CoreModule } from "./core/core.module";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

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
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
