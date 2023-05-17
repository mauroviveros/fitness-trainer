import { NgModule } from "@angular/core";

import { CoreRoutingModule } from "./core.routing";
import { AuthModule } from "./modules/auth/auth.module";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { SharedModule } from "../shared/shared.module";
import { ShortcutComponent } from './components/shortcut/shortcut.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    ShortcutComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    AuthModule
  ]
})
export class CoreModule { }
