import { NgModule } from "@angular/core";

import { AuthModule } from "./modules/auth/auth.module";
import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { ShortcutComponent } from "./components/shortcut/shortcut.component";


@NgModule({
  declarations: [
    ImageUploadComponent,
    SplashScreenComponent,
    ShortcutComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    AuthModule
  ],
  exports: [
    SplashScreenComponent
  ]
})
export class CoreModule { }
