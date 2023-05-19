import { NgModule } from "@angular/core";

import { CoreRoutingModule } from "./core.routing";
import { AuthModule } from "./modules/auth/auth.module";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { SharedModule } from "../shared/shared.module";
import { ShortcutComponent } from "./components/shortcut/shortcut.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { ProfileImageComponent } from "./components/profile-image/profile-image.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ShortcutComponent,
    ProfileComponent,
    ImageUploadComponent,
    ProfileImageComponent,
    SplashScreenComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    AuthModule
  ],
  exports: [
    SplashScreenComponent
  ]
})
export class CoreModule { }
