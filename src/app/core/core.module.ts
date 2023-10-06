import { NgModule } from "@angular/core";

import { AuthModule } from "./modules/auth/auth.module";

import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { SharedModule } from "../shared/shared.module";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { ProfileImageComponent } from "./components/profile-image/profile-image.component";
import { ShortcutComponent } from "./components/shortcut/shortcut.component";


@NgModule({
  declarations: [
    ImageUploadComponent,
    SplashScreenComponent,
    ProfileImageComponent,
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
