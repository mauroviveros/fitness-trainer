import { NgModule } from "@angular/core";

import { CoreRoutingModule } from "./core.routing";
import { AuthModule } from "./modules/auth/auth.module";
import { SharedModule } from "../shared/shared.module";

import { ShortcutComponent } from "./components/shortcut/shortcut.component";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { ProfileImageComponent } from "./components/profile-image/profile-image.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";

import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";

@NgModule({
  declarations: [
    ShortcutComponent,
    ImageUploadComponent,
    ProfileImageComponent,
    SplashScreenComponent,

    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    AuthModule
  ],
  exports: [
    SplashScreenComponent
  ]
})
export class CoreModule { }
